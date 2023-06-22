/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/indent */
/**
 * Returns the html string of the banner to be used by satori.
 * Use the params to customize and complete it.
 *
 * @param {'vertical' | 'horizontal'} layout
 * @param {{width: number, height: number}} dimensions
 *
 * @return {string}
 */
export function generateBannerHtml(layout, dimensions) {
	/** @type {boolean} */
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
					font-family: 'Mona Sans';
					background-color: white;
					margin: auto;
					border-radius: 1em;
					padding: ${horizontal ? '1.2' : '2.5'}em 2.5em;
					display: flex;
					${horizontal
							? 'flex-direction: row;'
							: 'flex-direction: column;'
					}
					align-items: center;
					min-width: 98%;
					min-height: 20%;
					gap: 1em;
			">
				<div style="
						align-items: center;
						display: flex;
						margin: ${horizontal ? '1.5' : '0'}em 0;
					">
					<svg xmlns="http://www.w3.org/2000/svg" width="3.5em" height="3.5em" viewBox="0 0 24 24">
						<g fill="currentColor">
							<path
								d="M15.75 2a.75.75 0 0 0-1.5 0v20a.75.75 0 0 0 1.5 0v-2.006c2.636-.027 4.104-.191 5.078-1.166C22 17.657 22 15.771 22 12c0-3.771 0-5.657-1.172-6.828c-.974-.975-2.442-1.139-5.078-1.166V2Z" />
							<path fill-rule="evenodd"
								d="M10 20c-3.771 0-5.657 0-6.828-1.172C2 17.657 2 15.771 2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h3v16h-3ZM6.818 7.787c.3-.037.666-.037 1.066-.037h2.232c.4 0 .766 0 1.066.037c.329.041.68.137.98.405c.052.046.1.094.146.146c.268.3.364.651.405.98c.037.3.037.666.037 1.066v.041a.75.75 0 0 1-1.5 0c0-.455-.001-.726-.026-.922c-.024-.195-.228-.227-.228-.227c-.195-.025-.466-.026-.921-.026H9.75v5.5H11a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1 0-1.5h1.25v-5.5h-.325c-.455 0-.726.001-.922.026c0 0-.203.032-.227.227c-.025.196-.026.467-.026.922a.75.75 0 0 1-1.5 0v-.041c0-.4 0-.766.037-1.066c.041-.329.137-.68.405-.98c.046-.052.094-.1.146-.146c.3-.268.651-.364.98-.405Z"
								clip-rule="evenodd" />
						</g>
					</svg>
				</div>
				<div style="
						align-items: center;
						display: flex;
					">
					<div style="display: flex; flex-direction: column;">
						<h1 style="
							margin: ${horizontal ? '0' : '0 0 1em 0'};
							font-weight: 600;
							text-overflow: ellipsis;
							max-width: 50em;
							${horizontal ? 'text-align: start;' : 'text-align: center;'}
						">
							%%MARKNOW-PLACEHOLDER-TITLE%%
						</h1>
						<sub style="
							font-size: medium;
							font-weight: 400;
							text-overflow: ellipsis;
							max-width: 50em;
							${horizontal ? 'text-align: start;' : 'text-align: center;'}
						">
							%%MARKNOW-PLACEHOLDER-SUBTILE%%
						</sub>
					</div>
				</div>
			</div>
		</div>
	`;
}
