import { Group, Scene, Vector3 } from "three";
import { FloatingText } from "./FloatingText.ts";
import { Minecraft } from "@housingeditor/housing-minecraft";

const MAX_LINES = 5;
const DISTANCE_APART = 0.375;
const SLIGHTLY_SHORTER_LINE = 0.03125;
const SPAWN_OFFSET = new Vector3(0.5, 0.4375, 0.5);

export class Hologram extends Group {
    private lines: FloatingText[] = [];
    private spawnPosition: Vector3;

    constructor(private minecraft: Minecraft, blockPosition: Vector3) {
        super();
        this.spawnPosition = blockPosition.add(SPAWN_OFFSET);
        this.position.copy(this.spawnPosition);
    }

    public addLine(text: string): void {
        if (this.lines.length >= MAX_LINES) {
            throw new Error("Maximum number of lines reached");
        }

        const floatingText = new FloatingText(text);
        this.minecraft.scene.add(floatingText);
        this.add(floatingText);
        this.lines.push(floatingText);

        this.updateLines();
    }

    public removeLine(index: number): void {
        if (index < 0 || index >= this.lines.length) {
            throw new Error("Index out of bounds");
        }
        const line = this.lines[index];
        this.minecraft.scene.remove(line);
        this.remove(line);
        this.lines.splice(index, 1);

        this.updateLines();
    }

    private updateLines(): void {
        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i];
            let distance = (this.lines.length - i) * DISTANCE_APART;
            if (i > 1) distance += SLIGHTLY_SHORTER_LINE;
            line.position.set(0, distance, 0);
        }
    }
}