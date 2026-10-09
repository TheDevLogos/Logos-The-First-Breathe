import { expect, test } from '@playwright/test';

test('the first echo can be experienced and a memory chosen', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Antes del primer silencio/i })).toBeVisible();
  await page.getByRole('button', { name: /Entrar en el jardín/i }).click();
  await expect(page.getByRole('heading', { name: /Todo tenía un lugar/i })).toBeVisible();
  await page.getByRole('button', { name: /Seguir el eco/i }).click();
  await expect(page.getByRole('heading', { name: /Qué harás con esta memoria/i })).toBeVisible();
  await page.getByRole('button', { name: /Compartirla/i }).click();
  await expect(page.getByRole('heading', { name: /Una luz compartida/i })).toBeVisible();
});
