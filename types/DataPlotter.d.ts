export class DataPlotter {
    constructor({ id, name, container_selector, width, height, raw_data_suffix }: {
        id?: string;
        name?: string;
        container_selector?: any;
        width?: number;
        height?: number;
        raw_data_suffix?: string;
    });
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    raw_data_label: HTMLDivElement;
    raw_data_suffix: string;
    ctx: CanvasRenderingContext2D;
    live_data_array: number[];
    on_resize(width: any, height: any): void;
    draw_function(func: any, min_x?: number, max_x?: number, graph_height?: number, color?: string, thick?: number): void;
    draw_array(array: any, graph_height?: number, baseline?: number, centered_origin?: boolean, color?: string, thick?: number): void;
    draw_static_live_array(value: any, graph_height?: number, baseline?: number, centered_origin?: boolean, color?: string, thick?: number): void;
    draw_dynamic_live_array(value: any, baseline?: number, centered_origin?: boolean, color?: string, thick?: number): void;
}
