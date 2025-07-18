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
import { routes } from "./chunks/chunk-733MZEOY.js";

// virtual:intro-section-animation
import { Fragment as Fragment2 } from "react";
import { ContextProviders } from "unframer";

// /:https://framerusercontent.com/modules/qfpuzKSVCQltye3gKF5y/FKbbJ5c7eT3v7WzeqOam/EHAmB9Kst.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
	addFonts,
	cx,
	SVG,
	useComponentViewport,
	useLocaleInfo,
	useVariantState,
	withCSS,
	withFX,
} from "unframer";
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";
var MotionDivWithFX = withFX(motion.div);
var serializationHash = "framer-MjB4o";
var variantClassNames = {
	ymn0uJv8W: "framer-v-8jf4p1",
};
var transition1 = {
	damping: 30,
	delay: 0,
	mass: 1,
	stiffness: 400,
	type: "spring",
};
var transition2 = {
	bounce: 0.1,
	delay: 0,
	duration: 0.9,
	type: "spring",
};
var animation = {
	opacity: 1,
	rotate: 0,
	rotateX: 0,
	rotateY: 0,
	scale: 1,
	skewX: 0,
	skewY: 0,
	x: 198,
	y: 0,
};
var transformTemplate1 = (_, t) => `translate(-50%, -50%) ${t}`;
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
var getProps = ({ height, id, width, ...props }) => {
	return {
		...props,
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
	const { style, className, layoutId, variant, ...restProps } = getProps(props);
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
		defaultVariant: "ymn0uJv8W",
		ref: refBinding,
		variant,
		variantClassNames,
	});
	const layoutDependency = createLayoutDependency(props, variants);
	const sharedStyleClassNames = [];
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
							"framer-8jf4p1",
							className,
							classNames,
						)}
						data-border={true}
						data-framer-name={"Variant 1"}
						layoutDependency={layoutDependency}
						layoutId={"ymn0uJv8W"}
						ref={refBinding}
						style={{
							"--border-bottom-width": "1px",
							"--border-color":
								"var(--token-61af1f46-12b4-4cd6-9489-e4165314c405, rgba(209, 63, 0, 0.7))",
							"--border-left-width": "1px",
							"--border-right-width": "1px",
							"--border-style": "solid",
							"--border-top-width": "1px",
							background:
								"linear-gradient(90deg, var(--token-e6cc12f6-2333-405c-a82f-b6c94880d746, rgba(46, 46, 46, 0.4)) 12%, var(--token-61af1f46-12b4-4cd6-9489-e4165314c405, rgba(209, 63, 0, 0.7)) 51%, var(--token-e6cc12f6-2333-405c-a82f-b6c94880d746, rgba(46, 46, 46, 0.4)) 91%)",
							borderBottomLeftRadius: 22,
							borderBottomRightRadius: 22,
							borderTopLeftRadius: 22,
							borderTopRightRadius: 22,
							...style,
						}}
					>
						<MotionDivWithFX
							__framer__loop={animation}
							__framer__loopEffectEnabled={true}
							__framer__loopPauseOffscreen={true}
							__framer__loopRepeatDelay={0}
							__framer__loopRepeatType={"mirror"}
							__framer__loopTransition={transition2}
							__perspectiveFX={false}
							__smartComponentFX={true}
							__targetOpacity={1}
							className={"framer-m38qto"}
							layoutDependency={layoutDependency}
							layoutId={"Q7HpbOQyi"}
							style={{
								backgroundColor:
									"var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, rgb(255, 255, 255))",
								borderBottomLeftRadius: 24,
								borderBottomRightRadius: 24,
								borderTopLeftRadius: 24,
								borderTopRightRadius: 24,
								boxShadow:
									"0px 0px 20px 1px var(--token-83878271-40bd-4314-b766-4d665555aa78, rgb(255, 77, 0))",
							}}
							transformTemplate={transformTemplate1}
						/>
						<SVG
							className={"framer-giyfwl"}
							data-framer-name={"Group 92"}
							fill={
								"var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, rgb(255, 255, 255))"
							}
							intrinsicHeight={43}
							intrinsicWidth={44}
							layoutDependency={layoutDependency}
							layoutId={"u4zvEHAAe"}
							svg={
								'<svg width="44" height="43" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">\n<circle cx="21.9974" cy="21.4336" r="21.1172" fill="url(#paint0_linear_96_51)" fill-opacity="0.17"/>\n<circle cx="21.9974" cy="21.4336" r="20.6172" stroke="url(#paint1_linear_96_51)" stroke-opacity="0.4"/>\n<path d="M22.0077 15.6426C22.0077 15.5321 21.9182 15.4426 21.8077 15.4426C21.6973 15.4426 21.6077 15.5321 21.6077 15.6426C21.6077 17.6 20.9337 19.2183 19.7944 20.3469C18.6547 21.4758 17.036 22.1281 15.1222 22.1281C15.0117 22.1281 14.9222 22.2177 14.9222 22.3281C14.9222 22.4386 15.0117 22.5281 15.1222 22.5281C17.036 22.5281 18.6547 23.1805 19.7944 24.3094C20.9337 25.438 21.6077 27.0562 21.6077 29.0137C21.6077 29.1242 21.6973 29.2137 21.8077 29.2137C21.9182 29.2137 22.0077 29.1242 22.0077 29.0137C22.0077 25.2072 24.8581 22.5281 28.4933 22.5281C28.6038 22.5281 28.6933 22.4386 28.6933 22.3281C28.6933 22.2177 28.6038 22.1281 28.4933 22.1281C26.6231 22.1281 25.0039 21.4974 23.8532 20.379C22.7034 19.2615 22.0077 17.6437 22.0077 15.6426Z" fill="#FF4D00" stroke="#FF4D00" stroke-width="0.4" stroke-linejoin="round"/>\n<path d="M28.5933 12.4219C28.5933 12.3666 28.5485 12.3219 28.4933 12.3219C28.4381 12.3219 28.3933 12.3666 28.3933 12.4219C28.3933 13.3633 28.0692 14.1413 27.5215 14.6838C26.9736 15.2265 26.1954 15.5402 25.275 15.5402C25.2197 15.5402 25.175 15.585 25.175 15.6402C25.175 15.6954 25.2197 15.7402 25.275 15.7402C26.1954 15.7402 26.9736 16.0539 27.5215 16.5966C28.0692 17.1391 28.3933 17.9171 28.3933 18.8585C28.3933 18.9138 28.4381 18.9585 28.4933 18.9585C28.5485 18.9585 28.5933 18.9138 28.5933 18.8585C28.5933 17.0282 29.9637 15.7402 31.7116 15.7402C31.7668 15.7402 31.8116 15.6954 31.8116 15.6402C31.8116 15.585 31.7668 15.5402 31.7116 15.5402C30.8122 15.5402 30.0337 15.2369 29.4805 14.6993C28.9278 14.1621 28.5933 13.3843 28.5933 12.4219Z" fill="#FF4D00" stroke="#FF4D00" stroke-width="0.2" stroke-linejoin="round"/>\n<defs>\n<linearGradient id="paint0_linear_96_51" x1="21.9974" y1="0.316406" x2="21.9974" y2="42.5508" gradientUnits="userSpaceOnUse">\n<stop stop-color="#EA7900"/>\n<stop offset="1" stop-color="#844400"/>\n</linearGradient>\n<linearGradient id="paint1_linear_96_51" x1="21.9974" y1="0.316406" x2="21.9974" y2="42.5508" gradientUnits="userSpaceOnUse">\n<stop stop-color="#FFB700"/>\n<stop offset="1" stop-color="#FF4D00"/>\n</linearGradient>\n</defs>\n</svg>\n'
							}
							withExternalLayout={true}
						/>
						<SVG
							className={"framer-12u9amq"}
							data-framer-name={"Group 91"}
							fill={
								"var(--token-de954fd2-a975-4916-8b85-2e5f2acf6b9e, rgb(255, 255, 255))"
							}
							intrinsicHeight={44}
							intrinsicWidth={44}
							layoutDependency={layoutDependency}
							layoutId={"WSUpEO9Nj"}
							svg={
								'<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">\n<circle cx="22.1016" cy="21.9219" r="21.1172" fill="url(#paint0_linear_80_1509)" fill-opacity="0.17"/>\n<circle cx="22.1016" cy="21.9219" r="20.6172" stroke="url(#paint1_linear_80_1509)" stroke-opacity="0.4"/>\n<path d="M13.4635 25.1602L30.7384 25.1602" stroke="#FF4D00" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M13.4635 18.6855L30.7384 18.6855" stroke="#FF4D00" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>\n<circle cx="22.101" cy="21.9242" r="9.71713" stroke="#FF4D00" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M22.1012 31.4459L21.8334 31.7084C21.9039 31.7804 22.0004 31.8209 22.1012 31.8209C22.202 31.8209 22.2985 31.7804 22.3691 31.7084L22.1012 31.4459ZM22.1012 12.4043L22.369 12.1418C22.2985 12.0699 22.202 12.0293 22.1012 12.0293C22.0004 12.0293 21.9039 12.0699 21.8334 12.1418L22.1012 12.4043ZM25.6131 21.9251C25.6131 25.5298 24.1718 28.7971 21.8334 31.1835L22.3691 31.7084C24.8393 29.1875 26.3631 25.7339 26.3631 21.9251H25.6131ZM21.8334 12.6668C24.1718 15.0532 25.6131 18.3205 25.6131 21.9251H26.3631C26.3631 18.1164 24.8393 14.6627 22.369 12.1418L21.8334 12.6668ZM18.5894 21.9251C18.5894 18.3205 20.0306 15.0532 22.369 12.6668L21.8334 12.1418C19.3631 14.6627 17.8394 18.1164 17.8394 21.9251H18.5894ZM22.3691 31.1835C20.0306 28.7971 18.5894 25.5298 18.5894 21.9251H17.8394C17.8394 25.7339 19.3631 29.1875 21.8334 31.7084L22.3691 31.1835Z" fill="#FF4D00"/>\n<defs>\n<linearGradient id="paint0_linear_80_1509" x1="22.1016" y1="0.804687" x2="22.1016" y2="43.0391" gradientUnits="userSpaceOnUse">\n<stop stop-color="#EA7900"/>\n<stop offset="1" stop-color="#844400"/>\n</linearGradient>\n<linearGradient id="paint1_linear_80_1509" x1="22.1016" y1="0.804687" x2="22.1016" y2="43.0391" gradientUnits="userSpaceOnUse">\n<stop stop-color="#FFB700"/>\n<stop offset="1" stop-color="#FF4D00"/>\n</linearGradient>\n</defs>\n</svg>\n'
							}
							withExternalLayout={true}
						/>
					</motion.div>
				</Transition>
			</Variants>
		</LayoutGroup>
	);
});
var css = [
	"@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
	".framer-MjB4o.framer-ibtrfb, .framer-MjB4o .framer-ibtrfb { display: block; }",
	".framer-MjB4o.framer-8jf4p1 { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; overflow: visible; padding: 0px; position: relative; width: 242px; }",
	".framer-MjB4o .framer-m38qto { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 42px); left: 9%; overflow: hidden; position: absolute; top: 50%; width: 42px; will-change: var(--framer-will-change-override, transform); z-index: 0; }",
	".framer-MjB4o .framer-giyfwl, .framer-MjB4o .framer-12u9amq { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 44px); position: relative; width: 44px; }",
	'.framer-MjB4o[data-border="true"]::after, .framer-MjB4o [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',
];
var FramerEHAmB9Kst = withCSS(Component, css, "framer-MjB4o");
var stdin_default = FramerEHAmB9Kst;
FramerEHAmB9Kst.displayName = "Intro Section Animation";
FramerEHAmB9Kst.defaultProps = {
	height: 44,
	width: 242,
};
addFonts(
	FramerEHAmB9Kst,
	[
		{
			explicitInter: true,
			fonts: [],
		},
	],
	{
		supportsExplicitInterCodegen: true,
	},
);

// virtual:intro-section-animation
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
			{jsx(stdin_default, {
				...rest,
			})}
		</ContextProviders>
	);
}
/**
 * Renders IntroSectionAnimationFramerComponent for all breakpoints with a variants map. Variant prop is inferred per breakpoint.
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
				Component={stdin_default}
				variants={defaultResponsiveVariants}
				{...rest}
			/>
		</ContextProviders>
	);
};
Object.assign(ComponentWithRoot, stdin_default);
var intro_section_animation_default = ComponentWithRoot;
export { intro_section_animation_default as default };
