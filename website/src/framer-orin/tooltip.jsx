// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project dfa04aa1c5bdec07 "Jet - SaaS Template (copy)", do not edit manually */
"use client";

import { className, css, fonts } from "./chunks/chunk-OUEV7UWA.js";

// virtual:tooltip
import { Fragment as Fragment2 } from "react";
import { ContextProviders } from "unframer";

// /:https://framerusercontent.com/modules/e16TLoZ8E30Al9Ar15H6/WFtQFJZQ8Vi0lukfWm3W/gQfNfN8Zq.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
	addFonts,
	addPropertyControls,
	ControlType,
	cx,
	getFontsFromSharedStyle,
	RichText,
	useComponentViewport,
	useLocaleInfo,
	useVariantState,
	withCSS,
} from "unframer";
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";
var serializationHash = "framer-K3y5T";
var variantClassNames = {
	EIDFb81rg: "framer-v-88l3dt",
};
var transition1 = {
	bounce: 0.2,
	delay: 0,
	duration: 0.4,
	type: "spring",
};
var transformTemplate1 = (_, t) => `translateX(-50%) ${t}`;
var Transition = ({ value, children }) => {
	const config = React.useContext(MotionConfigContext);
	const transition = value ?? config.transition;
	const contextValue = React.useMemo(
		() => ({
			...config,
			transition,
		}),
		[JSON.stringify(transition)],
	);
	return (
		<MotionConfigContext.Provider value={contextValue}>
			{children}
		</MotionConfigContext.Provider>
	);
};
var Variants = motion.create(React.Fragment);
var getProps = ({ height, id, tooltip, width, ...props }) => {
	return {
		...props,
		K2SanH58l:
			tooltip ??
			props.K2SanH58l ??
			"Manage multiple domains with a single account.",
	};
};
var createLayoutDependency = (props, variants) => {
	if (props.layoutDependency)
		return variants.join("-") + props.layoutDependency;
	return variants.join("-");
};
var Component = /* @__PURE__ */ React.forwardRef(function (props, ref) {
	const fallbackRef = useRef(null);
	const refBinding = ref ?? fallbackRef;
	const defaultLayoutId = React.useId();
	const { activeLocale, setLocale } = useLocaleInfo();
	const componentViewport = useComponentViewport();
	const {
		style,
		className: className2,
		layoutId,
		variant,
		K2SanH58l,
		...restProps
	} = getProps(props);
	const {
		baseVariant,
		classNames,
		clearLoadingGesture,
		gestureHandlers,
		gestureVariant,
		isLoading,
		setGestureState,
		setVariant,
		variants,
	} = useVariantState({
		defaultVariant: "EIDFb81rg",
		ref: refBinding,
		variant,
		variantClassNames,
	});
	const layoutDependency = createLayoutDependency(props, variants);
	const sharedStyleClassNames = [className];
	const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
	return (
		<LayoutGroup id={layoutId ?? defaultLayoutId}>
			<Variants animate={variants} initial={false}>
				<Transition value={transition1}>
					<motion.div
						{...restProps}
						{...gestureHandlers}
						className={cx(
							scopingClassNames,
							"framer-88l3dt",
							className2,
							classNames,
						)}
						data-framer-name={"Default"}
						layoutDependency={layoutDependency}
						layoutId={"EIDFb81rg"}
						ref={refBinding}
						style={{
							backgroundColor: "rgb(255, 255, 255)",
							borderBottomLeftRadius: 6,
							borderBottomRightRadius: 6,
							borderTopLeftRadius: 6,
							borderTopRightRadius: 6,
							...style,
						}}
					>
						<RichText
							__fromCanvasComponent={true}
							className={"framer-7kquo2"}
							fonts={["Inter"]}
							layoutDependency={layoutDependency}
							layoutId={"oo4WmgA7q"}
							style={{
								"--extracted-r6o4lv":
									"var(--token-bb3f9735-47c4-4ac2-b002-c5446021aee6, rgb(0, 0, 0))",
								"--framer-link-text-color": "rgb(0, 153, 255)",
								"--framer-link-text-decoration": "underline",
							}}
							text={K2SanH58l}
							verticalAlignment={"top"}
							withExternalLayout={true}
						>
							<React.Fragment>
								<motion.p
									className={"framer-styles-preset-2pjocb"}
									data-styles-preset={"Dkr92TfXs"}
									style={{
										"--framer-text-color":
											"var(--extracted-r6o4lv, var(--token-bb3f9735-47c4-4ac2-b002-c5446021aee6, rgb(0, 0, 0)))",
									}}
								>
									{"Manage multiple domains with a single account."}
								</motion.p>
							</React.Fragment>
						</RichText>
						<motion.div
							className={"framer-93kapl"}
							data-framer-name={"Tip"}
							layoutDependency={layoutDependency}
							layoutId={"FkGFrnuCJ"}
							style={{
								backgroundColor: "rgb(255, 255, 255)",
								rotate: 45,
							}}
							transformTemplate={transformTemplate1}
						/>
					</motion.div>
				</Transition>
			</Variants>
		</LayoutGroup>
	);
});
var css2 = [
	"@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
	".framer-K3y5T.framer-1hi6nc8, .framer-K3y5T .framer-1hi6nc8 { display: block; }",
	".framer-K3y5T.framer-88l3dt { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 8px 10px 8px 10px; position: relative; width: 195px; }",
	".framer-K3y5T .framer-7kquo2 { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
	".framer-K3y5T .framer-93kapl { aspect-ratio: 1 / 1; bottom: -5px; flex: none; height: var(--framer-aspect-ratio-supported, 12px); left: 50%; overflow: hidden; pointer-events: none; position: absolute; width: 12px; z-index: 1; }",
	...css,
];
var FramergQfNfN8Zq = withCSS(Component, css2, "framer-K3y5T");
var stdin_default = FramergQfNfN8Zq;
FramergQfNfN8Zq.displayName = "Tooltip";
FramergQfNfN8Zq.defaultProps = {
	height: 54.5,
	width: 195,
};
addPropertyControls(FramergQfNfN8Zq, {
	K2SanH58l: {
		defaultValue: "Manage multiple domains with a single account.",
		displayTextArea: false,
		title: "Tooltip",
		type: ControlType.String,
	},
});
addFonts(
	FramergQfNfN8Zq,
	[
		{
			explicitInter: true,
			fonts: [
				{
					family: "Inter",
					source: "framer",
					style: "normal",
					unicodeRange:
						"U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
					url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2",
					weight: "400",
				},
				{
					family: "Inter",
					source: "framer",
					style: "normal",
					unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
					url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2",
					weight: "400",
				},
				{
					family: "Inter",
					source: "framer",
					style: "normal",
					unicodeRange: "U+1F00-1FFF",
					url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2",
					weight: "400",
				},
				{
					family: "Inter",
					source: "framer",
					style: "normal",
					unicodeRange: "U+0370-03FF",
					url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2",
					weight: "400",
				},
				{
					family: "Inter",
					source: "framer",
					style: "normal",
					unicodeRange:
						"U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF",
					url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2",
					weight: "400",
				},
				{
					family: "Inter",
					source: "framer",
					style: "normal",
					unicodeRange:
						"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
					url: "https://framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2",
					weight: "400",
				},
				{
					family: "Inter",
					source: "framer",
					style: "normal",
					unicodeRange:
						"U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB",
					url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2",
					weight: "400",
				},
			],
		},
		...getFontsFromSharedStyle(fonts),
	],
	{
		supportsExplicitInterCodegen: true,
	},
);

// virtual:tooltip
import { WithFramerBreakpoints } from "unframer";
import { jsx } from "react/jsx-runtime";
var locales = [];
var defaultResponsiveVariants = {};
stdin_default.Responsive = ({ locale, ...rest }) => {
	return (
		<ContextProviders
			routes={{
				Agq1L2jDe: {
					path: "/careers/:slug",
				},
				J_r8CT7G7: {
					path: "/about",
				},
				SOf0RbDE_: {
					path: "/blog",
				},
				TQDjkQC2A: {
					path: "/contact",
				},
				YBTUYW5mq: {
					path: "/pricing",
				},
				a5CCfdDiy: {
					path: "/updates/:slug",
				},
				augiA20Il: {
					path: "/",
				},
				cpP7I9WGp: {
					path: "/404",
				},
				e9YIc4Uv5: {
					path: "/waitlist",
				},
				inNalAASs: {
					path: "/blog/:slug",
				},
				ixIXvnG3U: {
					path: "/legal/:slug",
				},
				rX7FOhQc0: {
					path: "/updates",
				},
				so5jTiDIE: {
					path: "/careers",
				},
			}}
			framerSiteId={
				"dfa04aa1c5bdec07246cce5cf5bdd608b64f5245b2256932daafbe1cb51c98be"
			}
			locale={locale}
			locales={locales}
		>
			<WithFramerBreakpoints
				Component={stdin_default}
				variants={defaultResponsiveVariants}
				{...rest}
			/>
		</ContextProviders>
	);
};
function ComponentWithRoot({ locale, ...rest }) {
	return (
		<ContextProviders
			routes={{
				Agq1L2jDe: {
					path: "/careers/:slug",
				},
				J_r8CT7G7: {
					path: "/about",
				},
				SOf0RbDE_: {
					path: "/blog",
				},
				TQDjkQC2A: {
					path: "/contact",
				},
				YBTUYW5mq: {
					path: "/pricing",
				},
				a5CCfdDiy: {
					path: "/updates/:slug",
				},
				augiA20Il: {
					path: "/",
				},
				cpP7I9WGp: {
					path: "/404",
				},
				e9YIc4Uv5: {
					path: "/waitlist",
				},
				inNalAASs: {
					path: "/blog/:slug",
				},
				ixIXvnG3U: {
					path: "/legal/:slug",
				},
				rX7FOhQc0: {
					path: "/updates",
				},
				so5jTiDIE: {
					path: "/careers",
				},
			}}
			framerSiteId={
				"dfa04aa1c5bdec07246cce5cf5bdd608b64f5245b2256932daafbe1cb51c98be"
			}
			locale={locale}
			locales={locales}
		>
			{jsx(stdin_default, {
				...rest,
			})}
		</ContextProviders>
	);
}
Object.assign(ComponentWithRoot, stdin_default);
export { ComponentWithRoot as default };
