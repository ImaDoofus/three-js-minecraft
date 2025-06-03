import "./style.css";
import { Minecraft, HousingWorld } from "housing-craft";

const canvas = document.querySelector("canvas")!;
const minecraft = new Minecraft(canvas);

for (let x = 0; x < HousingWorld.SIZE; x++) {
  for (let z = 0; z < HousingWorld.SIZE; z++) {
    for (let y = 0; y < 10; y++) {
      if (Math.random() < 0.01) {
        minecraft.world.set(x, y, z, Math.floor(Math.random() * 176));
      }
    }
  }
}

minecraft.world.buildChunks();

window.addEventListener("resize", () => {
  minecraft.resize();
});

minecraft.resize();
