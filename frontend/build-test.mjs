import { build } from 'vite';
try {
  await build();
} catch (e) {
  console.error("=== VITE BUILD ERROR DETAILS ===");
  console.error(e.message);
  if (e.errors) {
    console.error(JSON.stringify(e.errors, null, 2));
  } else {
    console.error(e);
  }
}
