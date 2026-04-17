import { expect, test } from "@playwright/test";

test("home and route smoke", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "WWT" })).toBeVisible();

  await page.getByRole("link", { name: "2) 상품 탐색" }).click();
  await expect(page).toHaveURL(/\/products/);
  await expect(page.getByRole("heading", { name: "홈" })).toBeVisible();
});
