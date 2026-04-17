import { expect, test } from "@playwright/test";

test("home and route smoke", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "지역 선택" })).toBeVisible();
  await expect(page.getByText("대덕소마고")).toBeVisible();

  await page.getByRole("link", { name: "페라리 브라이트 네롤리 입니다." }).click();
  await expect(page).toHaveURL(/\/products\/1/);
  await expect(page.getByRole("heading", { name: "상품 상세" })).toBeVisible();
});
