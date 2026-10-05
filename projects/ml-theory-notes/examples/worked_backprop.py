"""Reproduce the supplied 2 → 2 → 1 forward and backward calculation"""

import torch
import torch.nn.functional as F


def main() -> None:
    dtype = torch.float64
    x = torch.tensor([1.0, 2.0], dtype=dtype)
    y = torch.tensor(1.0, dtype=dtype)
    w1 = torch.tensor([[0.5, -0.2], [0.3, 0.8]], dtype=dtype, requires_grad=True)
    b1 = torch.tensor([0.1, -0.1], dtype=dtype, requires_grad=True)
    w2 = torch.tensor([0.7, -0.5], dtype=dtype, requires_grad=True)
    b2 = torch.tensor(0.2, dtype=dtype, requires_grad=True)

    z1 = w1 @ x + b1
    hidden = z1.relu()
    logit = w2 @ hidden + b2
    loss = F.binary_cross_entropy_with_logits(logit, y)
    loss.backward()

    # The hand calculation uses the source's single-observation convention
    with torch.no_grad():
        delta2 = logit.sigmoid() - y
        delta1 = w2 * delta2 * (z1 > 0)
        expected = [torch.outer(delta1, x), delta1, delta2 * hidden, delta2]
        parameters = [w1, b1, w2, b2]
        for parameter, gradient in zip(parameters, expected):
            torch.testing.assert_close(parameter.grad, gradient, rtol=1e-12, atol=1e-12)

        print(f"Hidden activations: {hidden.tolist()}")
        print(f"Logit: {logit.item():.6f}; probability: {logit.sigmoid().item():.6f}")
        print(f"Loss before update: {loss.item():.6f}")
        for name, parameter in zip(["W1", "b1", "W2", "b2"], parameters):
            print(f"Gradient {name}: {parameter.grad.tolist()}")
            parameter.add_(parameter.grad, alpha=-0.1)

        next_logit = w2 @ (w1 @ x + b1).relu() + b2
        next_loss = F.binary_cross_entropy_with_logits(next_logit, y)
        assert next_loss < loss, "The illustrated update should reduce this example's loss"
        print(f"Updated W1: {w1.tolist()}")
        print(f"Updated W2: {w2.tolist()}")
        print(f"Loss after update: {next_loss.item():.6f}")
        print("All four autograd gradients match the hand derivation")


if __name__ == "__main__":
    main()
