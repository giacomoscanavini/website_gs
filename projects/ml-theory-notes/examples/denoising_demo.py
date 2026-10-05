"""Authored denoising example on a synthetic one-dimensional curve in three dimensions"""

from copy import deepcopy
import torch
from torch import nn


def make_clean(n: int, generator: torch.Generator) -> torch.Tensor:
    t = 2 * torch.rand(n, 1, generator=generator) - 1
    return torch.cat([t, t.square(), torch.sin(torch.pi * t)], dim=1)


def main() -> None:
    torch.set_num_threads(1)
    torch.manual_seed(23)
    generator = torch.Generator().manual_seed(97)
    train = make_clean(768, generator)
    validation = make_clean(192, generator)
    test = make_clean(192, generator)
    noise_sd = 0.15
    validation_noisy = validation + noise_sd * torch.randn(validation.shape, generator=generator)
    test_noisy = test + noise_sd * torch.randn(test.shape, generator=generator)

    # A two-dimensional bottleneck is smaller than the three-dimensional input
    encoder = nn.Sequential(nn.Linear(3, 32), nn.Tanh(), nn.Linear(32, 2))
    decoder = nn.Sequential(nn.Linear(2, 32), nn.Tanh(), nn.Linear(32, 3))
    model = nn.Sequential(encoder, decoder)
    optimizer = torch.optim.Adam(model.parameters(), lr=0.005)
    loss_fn = nn.MSELoss()
    best_loss = float("inf")
    best_state = deepcopy(model.state_dict())
    bad_evaluations = 0
    best_step = 0

    for step in range(1, 801):
        model.train()
        noisy = train + noise_sd * torch.randn(train.shape, generator=generator)
        optimizer.zero_grad(set_to_none=True)
        loss = loss_fn(model(noisy), train)
        if not torch.isfinite(loss):
            raise FloatingPointError("Nonfinite training loss")
        loss.backward()
        optimizer.step()

        if step % 10 == 0:
            model.eval()
            with torch.no_grad():
                score = loss_fn(model(validation_noisy), validation).item()
            if score < best_loss - 1e-5:
                best_loss = score
                best_state = deepcopy(model.state_dict())
                best_step = step
                bad_evaluations = 0
            else:
                bad_evaluations += 1
            if bad_evaluations >= 12:
                break

    # Test data do not influence the selected checkpoint
    model.load_state_dict(best_state)
    model.eval()
    with torch.no_grad():
        baseline_mse = loss_fn(test_noisy, test).item()
        denoised_mse = loss_fn(model(test_noisy), test).item()
    assert denoised_mse < baseline_mse, "This seeded toy check should improve on the noisy input"
    print(f"Best validation checkpoint: step {best_step}")
    print(f"Test MSE of noisy input: {baseline_mse:.6f}")
    print(f"Test MSE after denoising: {denoised_mse:.6f}")
    print("Synthetic illustration only; denoising quality does not establish anomaly-detection quality")


if __name__ == "__main__":
    main()
