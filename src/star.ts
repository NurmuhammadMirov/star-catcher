import type {
  Artboard,
  File,
  RiveCanvas,
  StateMachineInstance,
  WrappedRenderer,
} from '@rive-app/canvas-advanced-single';
import type { Position } from "./types";
import { getRandomInt } from "./utils";

export default class Star {
  private position: Position;
  private artboard: Artboard;
  private stateMachine: StateMachineInstance;

  constructor(
    public canvas: HTMLCanvasElement,
    public rive: RiveCanvas,
    file: File,
  ) {
    this.artboard = file.artboardByName('star')!;
    const stateMachine = this.artboard.stateMachineByName('State Machine')!;
    const StateMachineInstance = new rive.StateMachineInstance(
      stateMachine,
      this.artboard,
    );

    this.position = {
      x: canvas.width + 10,
      y: getRandomInt(200, canvas.height - 200),
    };
  }

  update(elapsedTimeSec: number) {
    this.artboard.advance(elapsedTimeSec);
    this.stateMachine.advance(elapsedTimeSec);
  }

  draw(renderer: WrappedRenderer) {
    renderer.save();
    renderer.translate(this.position.x, this.position.y);
    this.artboard.draw(renderer);

    renderer.restore();
  }
}