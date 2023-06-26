/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/indent */
/**
 * Returns the html string of the banner to be used by satori.
 * Use the params to customize and complete it.
 *
 * @typedef {import('satori').SatoriOptions['fonts'][0]} Font
 *
 * @typedef {{
 *   dimensions: { width: number, height: number },
 *   fonts: { title: Font, subtitle: Font },
 *   layout: 'vertical' | 'horizontal',
 *   colors: import('./types').Colors,
 *   rtl: boolean,
 * }} Props
 * @param {Props} properties
 *
 * @return {string}
 */
export default function html({
	dimensions,
	layout,
	colors,
	fonts,
	rtl,
}) {
	const horizontal = layout === 'horizontal';

	return `
		<div style="
			display: flex;
			justify-items: center;
			align-items: center;
			width: ${dimensions.width}px;
			height: ${dimensions.height}px;
		">
			<div style="
					box-shadow: 0 5px 12px #00000040;
					position: relative;
					color: ${colors.foreground};
					background-color: ${colors.background};
					margin: auto;
					border-radius: 1em;
					padding: ${horizontal ? '1.2' : '2.5'}em 2.5em;
					display: flex;
					${horizontal
						? rtl
							? 'flex-direction: row-reverse;'
							: 'flex-direction: row;'
						: 'flex-direction: column;'
					}
					align-items: center;
					${horizontal
						? 'justify-content: flex-start;'
						: 'justify-content: center;'
					}
					min-width: 98%;
					min-height: 20%;
					gap: 1em;
			">
				<div style="
						align-items: center;
						display: flex;
						margin: ${horizontal ? '1.5' : '0'}em 0;
						width: 3.5em;
						height: 3.5em;
					">
					%%MARKNOW-PLACEHOLDER-ICON%%
				</div>
				<div style="
						align-items: center;
						display: flex;
					">
					<div style="display: flex; flex-direction: column;">
						<h1 style="
							margin: ${horizontal ? '0' : '0 auto 1em auto'};
							font-weight:  ${fonts.title.weight};
							font-family: ${fonts.title.name};
							text-overflow: ellipsis;
							max-width: 50em;
							display: flex;
							flex-direction: ${rtl ? 'row-reverse' : 'row'};
						">
							%%MARKNOW-PLACEHOLDER-TITLE%%
						</h1>
						<sub style="
							font-size: medium;
							font-weight:  ${fonts.subtitle.weight};
							font-family: ${fonts.subtitle.name};
							text-overflow: ellipsis;
							max-width: 50em;
							display: flex;
							flex-direction: ${rtl ? 'row-reverse' : 'row'};
							${horizontal
								? 'margin: 0;'
								: 'margin: 0 auto;'
							}
						">
							%%MARKNOW-PLACEHOLDER-SUBTILE%%
						</sub>
					</div>
				</div>
			</div>
		</div>
	`;
}
