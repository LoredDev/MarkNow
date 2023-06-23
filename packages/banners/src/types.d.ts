import type { Abortable } from "node:events";
import type { OpenMode, PathLike } from "node:fs";
import type { FileHandle } from "node:fs/promises";
import type { SatoriOptions } from "satori/wasm";

export type Font = SatoriOptions['fonts'][0];

export type Colors = {
	foreground: string;
	background: string;
}


export type Reader = (
	path: PathLike | FileHandle,
) => Promise<Buffer | ArrayBuffer>

/**
 * Options object for creating a banner.
 *
 * @package `@marknow/banners`
 */
export interface BannerOptions {
	title: string,
	subtitle?: string,
	layout?: 'horizontal' | 'vertical',
	font?: {
		title: Font,
		subtitle: Font,
	}
	colors?: Colors,
	libConfig?: {
		reader?: Reader,
	}
}

/**
 *
 */
export interface Banner {
	toString(): string,
	html: string,
	svg: string,
	vNodes: VNode,
}

/**
 * **Copied from the satori-html package,**
 * React-element-like objects / VDOM object used in satori.
 *
 * @package `satori-html`
 */
export interface VNode {
	type: string;
	props: {
		style?: Record<string, any>;
		children?: string | VNode | VNode[];
		[prop: string]: any;
	};
}
