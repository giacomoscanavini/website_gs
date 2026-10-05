"""Small numerical checks for regularization identities from the supplied guide"""

import torch


def main() -> None:
    torch.set_num_threads(1)
    generator = torch.Generator().manual_seed(41)
    dtype = torch.float64

    # Orthogonal Ridge example with the source's unnormalized objective
    x = torch.eye(3, dtype=dtype)
    y = torch.tensor([3.0, -2.0, 0.5], dtype=dtype)
    ridge = torch.linalg.solve(x.T @ x + torch.eye(3, dtype=dtype), x.T @ y)
    torch.testing.assert_close(ridge, torch.tensor([1.5, -1.0, 0.25], dtype=dtype))
    print("Orthogonal Ridge coefficients:", ridge.tolist())

    # The LASSO soft threshold is exact for this orthogonal scalar subproblem
    z = torch.tensor([2.4, 0.5, -1.1], dtype=dtype)
    lasso = z.sign() * (z.abs() - 0.7).clamp_min(0)
    torch.testing.assert_close(lasso, torch.tensor([1.7, 0.0, -0.4], dtype=dtype))
    print("Soft-thresholded coefficients:", lasso.tolist())

    # Verify the Gaussian input-noise identity approximately by Monte Carlo
    x = torch.randn(5, 3, generator=generator, dtype=dtype)
    beta = torch.tensor([0.6, -0.3, 0.8], dtype=dtype)
    y = x @ beta + torch.tensor([0.1, -0.2, 0.3, -0.1, 0.2], dtype=dtype)
    sigma = 0.2
    perturbations = sigma * torch.randn(100_000, 5, 3, generator=generator, dtype=dtype)
    noisy_losses = (y - (x + perturbations) @ beta).square().sum(dim=1)
    empirical = noisy_losses.mean()
    analytical = (y - x @ beta).square().sum() + len(x) * sigma**2 * beta.square().sum()
    standard_error = noisy_losses.std() / noisy_losses.numel()**0.5
    assert (empirical - analytical).abs() < 6 * standard_error
    print(f"Expected noisy squared loss: {analytical.item():.6f}")
    print(f"Monte Carlo estimate: {empirical.item():.6f} ± {standard_error.item():.6f} SE")

    # Reproduce the fixed-mask inverted-dropout example
    h = torch.tensor([2.0, 1.0, -3.0, 4.0], dtype=dtype)
    mask = torch.tensor([1.0, 0.0, 1.0, 0.0], dtype=dtype)
    masked = mask * h / 0.5
    torch.testing.assert_close(masked, torch.tensor([4.0, 0.0, -6.0, 0.0], dtype=dtype))
    print("Inverted dropout under the illustrated mask:", masked.tolist())
    print("Exact checks passed; the noise expectation is a finite-sample approximation")


if __name__ == "__main__":
    main()
