"""Classical CG on the source's symmetric positive-definite two-dimensional system"""

import torch


def conjugate_gradient(a: torch.Tensor, b: torch.Tensor, tolerance: float = 1e-12) -> torch.Tensor:
    if a.ndim != 2 or a.shape != (b.numel(), b.numel()) or b.ndim != 1:
        raise ValueError("Expected a square matrix and a matching one-dimensional right-hand side")
    if tolerance <= 0 or not a.is_floating_point() or a.dtype != b.dtype:
        raise ValueError("Use a positive tolerance and matching floating-point dtypes")
    if not torch.allclose(a, a.T):
        raise ValueError("Classical CG requires a symmetric matrix")
    if not torch.all(torch.linalg.eigvalsh(a) > 0):
        raise ValueError("This educational implementation requires positive definiteness")

    x = torch.zeros_like(b)
    residual = b - a @ x
    direction = residual.clone()
    squared_norm = residual @ residual
    if squared_norm.sqrt() <= tolerance:
        return x

    for step in range(b.numel()):
        action = a @ direction
        denominator = direction @ action
        if denominator <= 0:
            raise ArithmeticError("Encountered nonpositive curvature")
        alpha = squared_norm / denominator
        x = x + alpha * direction
        residual = residual - alpha * action
        next_squared_norm = residual @ residual
        print(f"Step {step + 1}: alpha={alpha.item():.8f}, x={x.tolist()}, residual={residual.tolist()}")
        if next_squared_norm.sqrt() <= tolerance:
            return x
        beta = next_squared_norm / squared_norm
        direction = residual + beta * direction
        squared_norm = next_squared_norm
    return x


def main() -> None:
    a = torch.tensor([[4.0, 1.0], [1.0, 3.0]], dtype=torch.float64)
    b = torch.tensor([1.0, 2.0], dtype=torch.float64)
    result = conjugate_gradient(a, b)
    torch.testing.assert_close(result, torch.linalg.solve(a, b), atol=1e-12, rtol=1e-12)
    torch.testing.assert_close(a @ result, b, atol=1e-12, rtol=1e-12)
    print("CG agrees with the direct solve: [1/11, 7/11]")
    print("This small deterministic example is not a general nonlinear training optimizer")


if __name__ == "__main__":
    main()
