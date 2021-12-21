export class DataPlotter {
    constructor(name?: string, width?: number, height?: number);
    ctx: CanvasRenderingContext2D;
    live_data_array: number[];
    draw_function(func: any, min_x?: number, max_x?: number, graph_height?: number, color?: string, thick?: number): void;
    draw_array(array: any, graph_height?: number, baseline?: number, centered_origin?: boolean, color?: string, thick?: number): void;
    draw_static_live_array(value: any, graph_height?: number, baseline?: number, centered_origin?: boolean, color?: string, thick?: number): void;
    draw_dynamic_live_array(value: any, baseline?: number, centered_origin?: boolean, color?: string, thick?: number): void;
}
