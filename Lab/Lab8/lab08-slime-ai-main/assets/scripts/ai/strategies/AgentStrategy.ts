import { ButtonState, IInputControls } from "../../input/IInputControls";
export namespace AI{
    /**
     * An abstraction over AI strategies.
     * An Agent can combine several strategies to create new strategies.
     * Remember to call their start and update methods.
     * 
     * This is a technique called "object composition".
     */
    export abstract class Strategy implements IInputControls{
        public abstract get horizontalAxis(): number;
        public abstract get verticalAxis(): number;
        public abstract get attack(): ButtonState;
        public abstract get interact(): ButtonState;
        /**
         * Implements initialization of the strategy.
         */
        public abstract start(): void;
        /**
         * Implements updating of the strategy.
         * @param dt Time elapsed since last update.
         */
        public abstract update(dt: number):void;
    }
}
