// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project 6ea1ba37e05fac32 "Fumabase website, made from Aset", do not edit manually */
"use client";

/**
 * @typedef Locale
 * string
 */

/**
 * @typedef {{
 * children?: React.ReactNode
 * locale?: Locale
 * style?: React.CSSProperties
 * className?: string
 * id?: string
 * ref?: any
 * width?: any
 * height?: any
 * layoutId?: string
 * variant?: 'Desktop' | 'Tablet' | 'Phone' // Variant
}} Props

 */

/**
 * @type {import("unframer").UnframerBreakpoint}
 * Represents a responsive breakpoint for unframer.
 */

/**
 * @typedef VariantsMap
 * Partial record of UnframerBreakpoint to Props.variant, with a mandatory 'base' key.
 * { [key in UnframerBreakpoint]?: Props['variant'] } & { base: Props['variant'] }
 */
import { stdin_default } from "../chunks/chunk-IETFVNRG.js";
import "../chunks/chunk-BTSBQWPZ.js";
import "../chunks/chunk-EWWPQ2JC.js";
import { className, css, fonts } from "../chunks/chunk-6G2SY433.js";
import { stdin_default as stdin_default2 } from "../chunks/chunk-EHCTMXQN.js";
import { routes } from "../chunks/chunk-733MZEOY.js";

// virtual:component/cta
import { Fragment as Fragment2 } from "react";
import { ContextProviders } from "unframer";

// /:https://framerusercontent.com/modules/3ZFMIMC6WwAlWOtEl0nt/f8NIJhft4xMfFpkVi6Jh/UwAUJRUI6.js
import { jsx as _jsx2, jsxs as _jsxs } from "react/jsx-runtime";
import {
	addFonts,
	addPropertyControls as addPropertyControls2,
	ComponentViewportProvider,
	ControlType as ControlType2,
	cx,
	getFonts,
	getFontsFromSharedStyle,
	RichText,
	SmartComponentScopedContainer,
	useComponentViewport,
	useLocaleInfo,
	useVariantState,
	withCSS,
	withFX,
} from "unframer";
import { LayoutGroup, motion as motion2, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";

// /:https://framerusercontent.com/modules/cKGD16u2MGB7MfqfVXFp/wiztTCbXokZrMicHAmZc/Grain.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addPropertyControls, ControlType, RenderTarget } from "unframer";
import { motion } from "unframer";
import { steps } from "@motionone/easing";
function Grain(props) {
	const { opacity, style } = props;
	const keyframesX = [
		"0%",
		"-5%",
		"-15%",
		"7%",
		"-5%",
		"-15%",
		"15%",
		"0%",
		"3%",
		"-10%",
	];
	const keyframesY = [
		"0%",
		"-10%",
		"5%",
		"-25%",
		"25%",
		"10%",
		"0%",
		"15%",
		"35%",
		"10%",
	];
	const isCanvas = RenderTarget.current() === RenderTarget.canvas;
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<motion.div
				style={{
					...containerStyle,
					opacity,
					inset: isCanvas ? 0 : "-200%",
					width: isCanvas ? "100%" : "400%",
					height: isCanvas ? "100%" : "400%",
					position: "absolute",
				}}
				animate={
					!isCanvas && {
						x: keyframesX,
						y: keyframesY,
					}
				}
				transition={{
					ease: steps(10, "start"),
					repeat: Infinity,
					duration: 8,
				}}
			/>
		</div>
	);
}
Grain.defaultProps = {
	opacity: 0.5,
};
addPropertyControls(Grain, {
	opacity: {
		title: "Opacity",
		type: ControlType.Number,
		step: 0.1,
		displayStepper: true,
		max: 1,
		min: 0,
	},
});
var containerStyle = {
	backgroundSize: "256px 256px",
	backgroundRepeat: "repeat",
	background:
		"url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
};

// /:https://framerusercontent.com/modules/4xysZuCAZczgALeEeRQZ/LO6KBuqpbd73PYjUgMZ7/thOPo8QL3.js
import { fontStore } from "unframer";
fontStore.loadFonts([
	"Inter-SemiBold",
	"Inter-Black",
	"Inter-BlackItalic",
	"Inter-BoldItalic",
]);
var fonts2 = [
	{
		explicitInter: true,
		fonts: [
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange:
					"U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
				url: "https://framerusercontent.com/assets/hyOgCu0Xnghbimh0pE8QTvtt2AU.woff2",
				weight: "600",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
				url: "https://framerusercontent.com/assets/NeGmSOXrPBfEFIy5YZeHq17LEDA.woff2",
				weight: "600",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange: "U+1F00-1FFF",
				url: "https://framerusercontent.com/assets/oYaAX5himiTPYuN8vLWnqBbfD2s.woff2",
				weight: "600",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange: "U+0370-03FF",
				url: "https://framerusercontent.com/assets/lEJLP4R0yuCaMCjSXYHtJw72M.woff2",
				weight: "600",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange:
					"U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF",
				url: "https://framerusercontent.com/assets/cRJyLNuTJR5jbyKzGi33wU9cqIQ.woff2",
				weight: "600",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange:
					"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
				url: "https://framerusercontent.com/assets/1ZFS7N918ojhhd0nQWdj3jz4w.woff2",
				weight: "600",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange:
					"U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB",
				url: "https://framerusercontent.com/assets/A0Wcc7NgXMjUuFdquHDrIZpzZw0.woff2",
				weight: "600",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange:
					"U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
				url: "https://framerusercontent.com/assets/mkY5Sgyq51ik0AMrSBwhm9DJg.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
				url: "https://framerusercontent.com/assets/X5hj6qzcHUYv7h1390c8Rhm6550.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange: "U+1F00-1FFF",
				url: "https://framerusercontent.com/assets/gQhNpS3tN86g8RcVKYUUaKt2oMQ.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange: "U+0370-03FF",
				url: "https://framerusercontent.com/assets/cugnVhSraaRyANCaUtI5FV17wk.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange:
					"U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF",
				url: "https://framerusercontent.com/assets/5HcVoGak8k5agFJSaKa4floXVu0.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange:
					"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
				url: "https://framerusercontent.com/assets/jn4BtSPLlS0NDp1KiFAtFKiiY0o.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "normal",
				unicodeRange:
					"U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB",
				url: "https://framerusercontent.com/assets/P2Bw01CtL0b9wqygO0sSVogWbo.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange:
					"U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
				url: "https://framerusercontent.com/assets/05KsVHGDmqXSBXM4yRZ65P8i0s.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
				url: "https://framerusercontent.com/assets/ky8ovPukK4dJ1Pxq74qGhOqCYI.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange: "U+1F00-1FFF",
				url: "https://framerusercontent.com/assets/vvNSqIj42qeQ2bvCRBIWKHscrc.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange: "U+0370-03FF",
				url: "https://framerusercontent.com/assets/3ZmXbBKToJifDV9gwcifVd1tEY.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange:
					"U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF",
				url: "https://framerusercontent.com/assets/FNfhX3dt4ChuLJq2PwdlxHO7PU.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange:
					"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
				url: "https://framerusercontent.com/assets/g0c8vEViiXNlKAgI4Ymmk3Ig.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange:
					"U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB",
				url: "https://framerusercontent.com/assets/efTfQcBJ53kM2pB1hezSZ3RDUFs.woff2",
				weight: "900",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange:
					"U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
				url: "https://framerusercontent.com/assets/H89BbHkbHDzlxZzxi8uPzTsp90.woff2",
				weight: "700",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
				url: "https://framerusercontent.com/assets/u6gJwDuwB143kpNK1T1MDKDWkMc.woff2",
				weight: "700",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange: "U+1F00-1FFF",
				url: "https://framerusercontent.com/assets/43sJ6MfOPh1LCJt46OvyDuSbA6o.woff2",
				weight: "700",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange: "U+0370-03FF",
				url: "https://framerusercontent.com/assets/wccHG0r4gBDAIRhfHiOlq6oEkqw.woff2",
				weight: "700",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange:
					"U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF",
				url: "https://framerusercontent.com/assets/WZ367JPwf9bRW6LdTHN8rXgSjw.woff2",
				weight: "700",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange:
					"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
				url: "https://framerusercontent.com/assets/QxmhnWTzLtyjIiZcfaLIJ8EFBXU.woff2",
				weight: "700",
			},
			{
				family: "Inter",
				source: "framer",
				style: "italic",
				unicodeRange:
					"U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB",
				url: "https://framerusercontent.com/assets/2A4Xx7CngadFGlVV4xrO06OBHY.woff2",
				weight: "700",
			},
		],
	},
];
var css2 = [
	'.framer-zhPc1 .framer-styles-preset-12kkq46:not(.rich-text-wrapper), .framer-zhPc1 .framer-styles-preset-12kkq46.rich-text-wrapper h3 { --framer-font-family: "Inter", "Inter Placeholder", sans-serif; --framer-font-family-bold: "Inter", sans-serif; --framer-font-family-bold-italic: "Inter", sans-serif; --framer-font-family-italic: "Inter", "Inter Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 40px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 600; --framer-font-weight-bold: 900; --framer-font-weight-bold-italic: 900; --framer-font-weight-italic: 700; --framer-letter-spacing: -0.02em; --framer-line-height: 1em; --framer-paragraph-spacing: 40px; --framer-text-alignment: left; --framer-text-color: var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, #ffffff); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }',
	'@media (max-width: 1199px) and (min-width: 810px) { .framer-zhPc1 .framer-styles-preset-12kkq46:not(.rich-text-wrapper), .framer-zhPc1 .framer-styles-preset-12kkq46.rich-text-wrapper h3 { --framer-font-family: "Inter", "Inter Placeholder", sans-serif; --framer-font-family-bold: "Inter", sans-serif; --framer-font-family-bold-italic: "Inter", sans-serif; --framer-font-family-italic: "Inter", "Inter Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 28px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 600; --framer-font-weight-bold: 900; --framer-font-weight-bold-italic: 900; --framer-font-weight-italic: 700; --framer-letter-spacing: -0.02em; --framer-line-height: 1em; --framer-paragraph-spacing: 40px; --framer-text-alignment: left; --framer-text-color: var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, #ffffff); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; } }',
	'@media (max-width: 809px) and (min-width: 0px) { .framer-zhPc1 .framer-styles-preset-12kkq46:not(.rich-text-wrapper), .framer-zhPc1 .framer-styles-preset-12kkq46.rich-text-wrapper h3 { --framer-font-family: "Inter", "Inter Placeholder", sans-serif; --framer-font-family-bold: "Inter", sans-serif; --framer-font-family-bold-italic: "Inter", sans-serif; --framer-font-family-italic: "Inter", "Inter Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 26px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 600; --framer-font-weight-bold: 900; --framer-font-weight-bold-italic: 900; --framer-font-weight-italic: 700; --framer-letter-spacing: -0.02em; --framer-line-height: 1em; --framer-paragraph-spacing: 40px; --framer-text-alignment: left; --framer-text-color: var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, #ffffff); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; } }',
];
var className2 = "framer-zhPc1";

// /:https://framerusercontent.com/modules/3ZFMIMC6WwAlWOtEl0nt/f8NIJhft4xMfFpkVi6Jh/UwAUJRUI6.js
var GrainFonts = getFonts(Grain);
var RichTextWithFX = withFX(RichText);
var ComponentButtonFonts = getFonts(stdin_default);
var SmartComponentScopedContainerWithFX = withFX(SmartComponentScopedContainer);
var MotionDivWithFX = withFX(motion2.div);
var GridFonts = getFonts(stdin_default2);
var cycleOrder = ["h4Htb6ikw", "zAYUkgshF", "wNpY6eSkL"];
var serializationHash = "framer-BdmJM";
var variantClassNames = {
	h4Htb6ikw: "framer-v-ra8t5r",
	wNpY6eSkL: "framer-v-1e2x1x3",
	zAYUkgshF: "framer-v-ucwkgi",
};
function addPropertyOverrides(overrides, ...variants) {
	const nextOverrides = {};
	variants?.forEach(
		(variant) => variant && Object.assign(nextOverrides, overrides[variant]),
	);
	return nextOverrides;
}
var transition1 = {
	bounce: 0.2,
	delay: 0,
	duration: 1,
	type: "spring",
};
var animation = {
	opacity: 0,
	rotate: 0,
	rotateX: 0,
	rotateY: 0,
	scale: 1,
	skewX: 0,
	skewY: 0,
	x: 0,
	y: 50,
};
var transition2 = {
	bounce: 0.1,
	delay: 0,
	duration: 0.8,
	type: "spring",
};
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
var Variants = motion2.create(React.Fragment);
var humanReadableVariantMap = {
	Desktop: "h4Htb6ikw",
	Phone: "wNpY6eSkL",
	Tablet: "zAYUkgshF",
};
var getProps = ({ height, id, width, ...props }) => {
	return {
		...props,
		variant:
			humanReadableVariantMap[props.variant] ?? props.variant ?? "h4Htb6ikw",
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
		className: className3,
		layoutId,
		variant,
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
		cycleOrder,
		defaultVariant: "h4Htb6ikw",
		ref: refBinding,
		variant,
		variantClassNames,
	});
	const layoutDependency = createLayoutDependency(props, variants);
	const sharedStyleClassNames = [className2, className];
	const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
	return (
		<LayoutGroup id={layoutId ?? defaultLayoutId}>
			<Variants animate={variants} initial={false}>
				<Transition value={transition1}>
					<motion2.div
						{...restProps}
						{...gestureHandlers}
						className={cx(
							scopingClassNames,
							"framer-ra8t5r",
							className3,
							classNames,
						)}
						data-framer-name={"Desktop"}
						layoutDependency={layoutDependency}
						layoutId={"h4Htb6ikw"}
						ref={refBinding}
						style={{
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10,
							...style,
						}}
						{...addPropertyOverrides(
							{
								wNpY6eSkL: {
									"data-framer-name": "Phone",
								},
								zAYUkgshF: {
									"data-framer-name": "Tablet",
								},
							},
							baseVariant,
							gestureVariant,
						)}
					>
						<MotionDivWithFX
							__framer__animate={{
								transition: transition2,
							}}
							__framer__animateOnce={true}
							__framer__enter={animation}
							__framer__styleAppearEffectEnabled={true}
							__framer__threshold={0}
							__perspectiveFX={false}
							__smartComponentFX={true}
							__targetOpacity={1}
							className={"framer-q3918f"}
							data-framer-name={"CTA"}
							layoutDependency={layoutDependency}
							layoutId={"A0i2EFIEb"}
						>
							<motion2.div
								className={"framer-vberre"}
								data-border={true}
								data-framer-name={"Content"}
								layoutDependency={layoutDependency}
								layoutId={"kqe7A7GHL"}
								style={{
									"--border-bottom-width": "1px",
									"--border-color":
										"var(--token-18d2a01a-9676-41c1-bf6d-4772415cc68b, rgb(62, 32, 19))",
									"--border-left-width": "1px",
									"--border-right-width": "1px",
									"--border-style": "solid",
									"--border-top-width": "1px",
									background:
										"radial-gradient(55.00000000000001% 112.99999999999999% at 50% 114.7%, var(--token-ba966f44-b096-454c-b9a7-2e7b01439cc6, rgb(250, 187, 0)) 0%, var(--token-298b4add-111d-4ff0-82fc-7d5e99a4405b, rgb(204, 61, 0)) 46.57534246575342%, var(--token-8e5d2111-03fd-4926-9cea-98bf1e41078f, rgb(23, 23, 23)) 100%)",
									borderBottomLeftRadius: 20,
									borderBottomRightRadius: 20,
									borderTopLeftRadius: 20,
									borderTopRightRadius: 20,
								}}
								variants={{
									wNpY6eSkL: {
										background:
											"radial-gradient(107% 95% at 50% 105.1%, var(--token-ba966f44-b096-454c-b9a7-2e7b01439cc6, rgb(250, 187, 0)) 0%, var(--token-298b4add-111d-4ff0-82fc-7d5e99a4405b, rgb(204, 61, 0)) 34.36373873873874%, var(--token-8e5d2111-03fd-4926-9cea-98bf1e41078f, rgb(23, 23, 23)) 100%)",
									},
								}}
							>
								<ComponentViewportProvider>
									<SmartComponentScopedContainer
										className={"framer-2tnfwn-container"}
										isAuthoredByUser={true}
										isModuleExternal={true}
										layoutDependency={layoutDependency}
										layoutId={"cgZbyGtSp-container"}
										nodeId={"cgZbyGtSp"}
										rendersWithMotion={true}
										scopeId={"UwAUJRUI6"}
										style={{
											opacity: 0.09,
										}}
									>
										<Grain
											height={"100%"}
											id={"cgZbyGtSp"}
											layoutId={"cgZbyGtSp"}
											opacity={0.5}
											style={{
												height: "100%",
												width: "100%",
											}}
											width={"100%"}
										/>
									</SmartComponentScopedContainer>
								</ComponentViewportProvider>
								<RichTextWithFX
									__framer__animate={{
										transition: transition2,
									}}
									__framer__animateOnce={true}
									__framer__enter={animation}
									__framer__styleAppearEffectEnabled={true}
									__framer__threshold={0}
									__fromCanvasComponent={true}
									__perspectiveFX={false}
									__smartComponentFX={true}
									__targetOpacity={1}
									className={"framer-1771gfq"}
									fonts={["Inter"]}
									layoutDependency={layoutDependency}
									layoutId={"G88oqGuts"}
									style={{
										"--framer-paragraph-spacing": "0px",
									}}
									verticalAlignment={"top"}
									withExternalLayout={true}
								>
									<React.Fragment>
										<motion2.h3
											className={"framer-styles-preset-12kkq46"}
											data-styles-preset={"thOPo8QL3"}
											style={{
												"--framer-text-alignment": "center",
											}}
										>
											{"Start Investing Smarter Today"}
										</motion2.h3>
									</React.Fragment>
								</RichTextWithFX>
								<RichTextWithFX
									__framer__animate={{
										transition: transition2,
									}}
									__framer__animateOnce={true}
									__framer__enter={animation}
									__framer__styleAppearEffectEnabled={true}
									__framer__threshold={0}
									__fromCanvasComponent={true}
									__perspectiveFX={false}
									__smartComponentFX={true}
									__targetOpacity={0.9}
									className={"framer-ybsbx3"}
									fonts={["Inter"]}
									layoutDependency={layoutDependency}
									layoutId={"M689UOJ6z"}
									style={{
										"--framer-link-text-color": "rgb(0, 153, 255)",
										"--framer-link-text-decoration": "underline",
										opacity: 0.9,
									}}
									verticalAlignment={"top"}
									withExternalLayout={true}
								>
									<React.Fragment>
										<motion2.p
											className={"framer-styles-preset-4mzurx"}
											data-styles-preset={"C5Bqm4Y89"}
											style={{
												"--framer-text-alignment": "center",
											}}
										>
											{
												"Harness the power of AI to grow your portfolio with confidence and clarity."
											}
										</motion2.p>
									</React.Fragment>
								</RichTextWithFX>
								<ComponentViewportProvider
									height={40}
									y={
										(componentViewport?.y || 0) +
										100 +
										(((componentViewport?.height || 497.5) - 200 - 360) / 2 +
											0 +
											0) +
										0 +
										0 +
										80 +
										180
									}
									{...addPropertyOverrides(
										{
											wNpY6eSkL: {
												y:
													(componentViewport?.y || 0) +
													100 +
													(((componentViewport?.height || 521.5) - 120 - 420) /
														2 +
														0 +
														0) +
													0 +
													0 +
													100 +
													180,
											},
											zAYUkgshF: {
												y:
													(componentViewport?.y || 0) +
													120 +
													(((componentViewport?.height || 541.5) - 200 - 364) /
														2 +
														0 +
														0) +
													0 +
													0 +
													80 +
													184,
											},
										},
										baseVariant,
										gestureVariant,
									)}
								>
									<SmartComponentScopedContainerWithFX
										__framer__animate={{
											transition: transition2,
										}}
										__framer__animateOnce={true}
										__framer__enter={animation}
										__framer__styleAppearEffectEnabled={true}
										__framer__threshold={0}
										__perspectiveFX={false}
										__smartComponentFX={true}
										__targetOpacity={1}
										className={"framer-pcdke3-container"}
										layoutDependency={layoutDependency}
										layoutId={"BbprX32Na-container"}
										nodeId={"BbprX32Na"}
										rendersWithMotion={true}
										scopeId={"UwAUJRUI6"}
									>
										{_jsx2(stdin_default, {
											b7sws2Xmf: true,
											gDhgzsvqf: "https://www.framer.com?via=green13",
											height: "100%",
											id: "BbprX32Na",
											layoutId: "BbprX32Na",
											nx2tuureE: "Get Started",
											variant: "z1bsEAxC0",
											width: "100%",
											...addPropertyOverrides(
												{
													wNpY6eSkL: {
														variant: "h_czR0__J",
													},
												},
												baseVariant,
												gestureVariant,
											),
										})}
									</SmartComponentScopedContainerWithFX>
								</ComponentViewportProvider>
							</motion2.div>
						</MotionDivWithFX>
						<motion2.div
							className={"framer-1t1eh67"}
							data-framer-name={"Grid"}
							layoutDependency={layoutDependency}
							layoutId={"A4Ls6dkJ2"}
						>
							<ComponentViewportProvider
								height={578}
								width={componentViewport?.width || "100vw"}
								y={(componentViewport?.y || 0) + 0 + 0}
							>
								<SmartComponentScopedContainer
									className={"framer-1pmycbc-container"}
									layoutDependency={layoutDependency}
									layoutId={"WaP5g_VO4-container"}
									nodeId={"WaP5g_VO4"}
									rendersWithMotion={true}
									scopeId={"UwAUJRUI6"}
								>
									{_jsx2(stdin_default2, {
										height: "100%",
										id: "WaP5g_VO4",
										layoutId: "WaP5g_VO4",
										style: {
											height: "100%",
											width: "100%",
										},
										variant: "hdexXEO_X",
										width: "100%",
										...addPropertyOverrides(
											{
												wNpY6eSkL: {
													variant: "mWhcw8lXH",
												},
												zAYUkgshF: {
													variant: "QYQ1r9X7u",
												},
											},
											baseVariant,
											gestureVariant,
										),
									})}
								</SmartComponentScopedContainer>
							</ComponentViewportProvider>
						</motion2.div>
					</motion2.div>
				</Transition>
			</Variants>
		</LayoutGroup>
	);
});
var css3 = [
	"@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
	".framer-BdmJM.framer-m0pjrk, .framer-BdmJM .framer-m0pjrk { display: block; }",
	".framer-BdmJM.framer-ra8t5r { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; overflow: hidden; padding: 100px; position: relative; width: 1200px; will-change: var(--framer-will-change-override, transform); }",
	".framer-BdmJM .framer-q3918f { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; max-width: 900px; overflow: hidden; padding: 0px; position: relative; width: 100%; z-index: 1; }",
	".framer-BdmJM .framer-vberre { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 18px; height: min-content; justify-content: center; overflow: hidden; padding: 80px 60px 60px 60px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); z-index: 1; }",
	".framer-BdmJM .framer-2tnfwn-container { flex: none; height: 100%; left: calc(50.00000000000002% - 100% / 2); position: absolute; top: calc(49.526813880126205% - 100% / 2); width: 100%; z-index: 1; }",
	".framer-BdmJM .framer-1771gfq { flex: none; height: auto; max-width: 600px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
	".framer-BdmJM .framer-ybsbx3 { flex: none; height: auto; max-width: 450px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }",
	".framer-BdmJM .framer-pcdke3-container { flex: none; height: auto; position: relative; width: auto; z-index: 1; }",
	".framer-BdmJM .framer-1t1eh67 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 578px; justify-content: center; overflow: hidden; padding: 0px; position: absolute; right: 0px; top: 0px; width: 100%; z-index: 0; }",
	".framer-BdmJM .framer-1pmycbc-container { flex: none; height: 100%; left: calc(50.00000000000002% - 100% / 2); position: absolute; top: 0px; width: 100%; z-index: 0; }",
	".framer-BdmJM.framer-v-ucwkgi.framer-ra8t5r { padding: 120px 40px 80px 40px; width: 810px; }",
	".framer-BdmJM.framer-v-ucwkgi .framer-q3918f { max-width: 810px; order: 0; }",
	".framer-BdmJM.framer-v-ucwkgi .framer-vberre { gap: 20px; }",
	".framer-BdmJM.framer-v-ucwkgi .framer-1771gfq { max-width: 90%; }",
	".framer-BdmJM.framer-v-ucwkgi .framer-ybsbx3 { max-width: 70%; }",
	".framer-BdmJM.framer-v-ucwkgi .framer-1t1eh67, .framer-BdmJM.framer-v-1e2x1x3 .framer-1t1eh67 { order: 1; }",
	".framer-BdmJM.framer-v-1e2x1x3.framer-ra8t5r { padding: 100px 20px 20px 20px; width: 390px; }",
	".framer-BdmJM.framer-v-1e2x1x3 .framer-q3918f { max-width: 580px; order: 0; }",
	".framer-BdmJM.framer-v-1e2x1x3 .framer-vberre { padding: 100px 20px 100px 20px; }",
	".framer-BdmJM.framer-v-1e2x1x3 .framer-1771gfq { max-width: 500px; }",
	...css2,
	...css,
	'.framer-BdmJM[data-border="true"]::after, .framer-BdmJM [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
];
var FramerUwAUJRUI6 = withCSS(Component, css3, "framer-BdmJM");
var stdin_default3 = FramerUwAUJRUI6;
FramerUwAUJRUI6.displayName = "Component/CTA";
FramerUwAUJRUI6.defaultProps = {
	height: 497.5,
	width: 1200,
};
addPropertyControls2(FramerUwAUJRUI6, {
	variant: {
		options: ["h4Htb6ikw", "zAYUkgshF", "wNpY6eSkL"],
		optionTitles: ["Desktop", "Tablet", "Phone"],
		title: "Variant",
		type: ControlType2.Enum,
	},
});
addFonts(
	FramerUwAUJRUI6,
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
		...GrainFonts,
		...ComponentButtonFonts,
		...GridFonts,
		...getFontsFromSharedStyle(fonts2),
		...getFontsFromSharedStyle(fonts),
	],
	{
		supportsExplicitInterCodegen: true,
	},
);

// virtual:component/cta
import { WithFramerBreakpoints } from "unframer";
import { jsx } from "react/jsx-runtime";
var locales = [];
var defaultResponsiveVariants = {};
/** @type {function(Props): any} */
function ComponentWithRoot({ locale, ...rest }) {
	return (
		<ContextProviders
			routes={routes}
			framerSiteId={
				"6ea1ba37e05fac32a45356fef8456248177d20a6a62facacd4fc997df2f330fd"
			}
			locale={locale}
			locales={locales}
		>
			{jsx(stdin_default3, {
				...rest,
			})}
		</ContextProviders>
	);
}
/**
 * Renders CtaFramerComponent for all breakpoints with a variants map. Variant prop is inferred per breakpoint.
 * @function
 * @param {Omit<Props, 'variant'> & {variants?: VariantsMap}} props
 * @returns {any}
 */
ComponentWithRoot.Responsive = ({ locale, ...rest }) => {
	return (
		<ContextProviders
			routes={routes}
			framerSiteId={
				"6ea1ba37e05fac32a45356fef8456248177d20a6a62facacd4fc997df2f330fd"
			}
			locale={locale}
			locales={locales}
		>
			<WithFramerBreakpoints
				Component={stdin_default3}
				variants={defaultResponsiveVariants}
				{...rest}
			/>
		</ContextProviders>
	);
};
Object.assign(ComponentWithRoot, stdin_default3);
var cta_default = ComponentWithRoot;
export { cta_default as default };
