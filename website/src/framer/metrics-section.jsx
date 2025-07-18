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
import { stdin_default } from "./chunks/chunk-UUA2UP3M.js";
import "./chunks/chunk-SNH2M5FY.js";
import { className, css, fonts } from "./chunks/chunk-KYATNZPG.js";
import { stdin_default as stdin_default2 } from "./chunks/chunk-EHCTMXQN.js";
import { routes } from "./chunks/chunk-733MZEOY.js";

// virtual:metrics-section
import { Fragment as Fragment2 } from "react";
import { ContextProviders } from "unframer";

// /:https://framerusercontent.com/modules/2SsOGDH5kdOgAPwE40h3/MoPCntU2621TwAFHPkYP/vhCjmM3G7.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
	addFonts,
	addPropertyControls,
	ComponentViewportProvider,
	ControlType,
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
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";
var MotionDivWithFX = withFX(motion.div);
var MetricsFonts = getFonts(stdin_default);
var SmartComponentScopedContainerWithFX = withFX(SmartComponentScopedContainer);
var GridFonts = getFonts(stdin_default2);
var cycleOrder = ["RbAa9puV7", "OtqoiJd06", "fRvvpqAuJ"];
var serializationHash = "framer-Tqu6U";
var variantClassNames = {
	fRvvpqAuJ: "framer-v-tfloyz",
	OtqoiJd06: "framer-v-1y6mng5",
	RbAa9puV7: "framer-v-1fvnu53",
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
	duration: 0.4,
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
var transition3 = {
	damping: 80,
	delay: 0.1,
	mass: 1,
	stiffness: 400,
	type: "spring",
};
var animation1 = {
	opacity: 0,
	rotate: 0,
	rotateX: 0,
	rotateY: 0,
	scale: 1,
	skewX: 0,
	skewY: 0,
	x: 0,
	y: 80,
};
var transition4 = {
	bounce: 0.1,
	delay: 0.1,
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
var Variants = motion.create(React.Fragment);
var humanReadableVariantMap = {
	Desktop: "RbAa9puV7",
	Phone: "fRvvpqAuJ",
	Tablet: "OtqoiJd06",
};
var getProps = ({ height, id, width, ...props }) => {
	return {
		...props,
		variant:
			humanReadableVariantMap[props.variant] ?? props.variant ?? "RbAa9puV7",
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
		defaultVariant: "RbAa9puV7",
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
					<motion.section
						{...restProps}
						{...gestureHandlers}
						className={cx(
							scopingClassNames,
							"framer-1fvnu53",
							className2,
							classNames,
						)}
						data-framer-name={"Desktop"}
						layoutDependency={layoutDependency}
						layoutId={"RbAa9puV7"}
						ref={refBinding}
						style={{
							...style,
						}}
						{...addPropertyOverrides(
							{
								fRvvpqAuJ: {
									"data-framer-name": "Phone",
								},
								OtqoiJd06: {
									"data-framer-name": "Tablet",
								},
							},
							baseVariant,
							gestureVariant,
						)}
					>
						<motion.div
							className={"framer-nxlf1j"}
							data-framer-name={"Container"}
							layoutDependency={layoutDependency}
							layoutId={"WEdI9qcZA"}
						>
							<MotionDivWithFX
								__framer__animate={{
									transition: transition2,
								}}
								__framer__animateOnce={true}
								__framer__enter={animation}
								__framer__styleAppearEffectEnabled={true}
								__framer__threshold={0.5}
								__perspectiveFX={false}
								__smartComponentFX={true}
								__targetOpacity={1}
								className={"framer-1kj9rp9"}
								data-framer-name={"Heading & Supporting Text"}
								layoutDependency={layoutDependency}
								layoutId={"IslT99sz6"}
								{...addPropertyOverrides(
									{
										fRvvpqAuJ: {
											__framer__enter: animation1,
											__framer__threshold: 0,
										},
										OtqoiJd06: {
											__framer__animate: {
												transition: transition3,
											},
											__framer__threshold: 0,
										},
									},
									baseVariant,
									gestureVariant,
								)}
							>
								<RichText
									__fromCanvasComponent={true}
									className={"framer-tkkfp8"}
									data-framer-name={"Heading"}
									fonts={["Inter"]}
									layoutDependency={layoutDependency}
									layoutId={"jcIzsKCRB"}
									style={{
										"--framer-link-text-color": "rgb(0, 153, 255)",
										"--framer-link-text-decoration": "underline",
									}}
									verticalAlignment={"top"}
									withExternalLayout={true}
								>
									<React.Fragment>
										<motion.h2
											className={"framer-styles-preset-163xgy6"}
											data-styles-preset={"EEpMe6lZZ"}
											style={{
												"--framer-text-alignment": "center",
											}}
										>
											{"Performance You Can Measure"}
										</motion.h2>
									</React.Fragment>
								</RichText>
							</MotionDivWithFX>
							<motion.div
								className={"framer-v864au"}
								data-framer-name={"Metrics"}
								layoutDependency={layoutDependency}
								layoutId={"SVOktuoNC"}
							>
								<motion.div
									className={"framer-6vh5bz"}
									data-framer-name={"Container"}
									layoutDependency={layoutDependency}
									layoutId={"Qiim8RUy1"}
								>
									<ComponentViewportProvider
										height={104}
										y={
											(componentViewport?.y || 0) +
											220 +
											0 +
											0 +
											89.2 +
											0 +
											0 +
											0
										}
										{...addPropertyOverrides(
											{
												fRvvpqAuJ: {
													y:
														(componentViewport?.y || 0) +
														120 +
														(((componentViewport?.height || 684) -
															170 -
															468.2) /
															2 +
															0 +
															0) +
														0 +
														86.2 +
														0 +
														0 +
														0 +
														0,
												},
												OtqoiJd06: {
													y:
														(componentViewport?.y || 0) +
														150 +
														0 +
														0 +
														71.2 +
														0 +
														0 +
														0,
												},
											},
											baseVariant,
											gestureVariant,
										)}
									>
										<SmartComponentScopedContainerWithFX
											__framer__animate={{
												transition: transition4,
											}}
											__framer__animateOnce={true}
											__framer__enter={animation}
											__framer__styleAppearEffectEnabled={true}
											__framer__threshold={0.5}
											__perspectiveFX={false}
											__smartComponentFX={true}
											__targetOpacity={1}
											className={"framer-1i3s4lk-container"}
											layoutDependency={layoutDependency}
											layoutId={"Ekaa9E_EB-container"}
											nodeId={"Ekaa9E_EB"}
											rendersWithMotion={true}
											scopeId={"vhCjmM3G7"}
											{...addPropertyOverrides(
												{
													OtqoiJd06: {
														__framer__threshold: 0,
													},
												},
												baseVariant,
												gestureVariant,
											)}
										>
											{_jsx(stdin_default, {
												height: "100%",
												id: "Ekaa9E_EB",
												IOMocQpEh: "98.7%",
												layoutId: "Ekaa9E_EB",
												variant: "TwYCDqD7T",
												vCgcTaJbS: "Client Retention Rate",
												width: "100%",
												...addPropertyOverrides(
													{
														fRvvpqAuJ: {
															variant: "zcYR2_vFP",
														},
													},
													baseVariant,
													gestureVariant,
												),
											})}
										</SmartComponentScopedContainerWithFX>
									</ComponentViewportProvider>
									<ComponentViewportProvider
										height={104}
										y={
											(componentViewport?.y || 0) +
											220 +
											0 +
											0 +
											89.2 +
											0 +
											0 +
											0
										}
										{...addPropertyOverrides(
											{
												fRvvpqAuJ: {
													y:
														(componentViewport?.y || 0) +
														120 +
														(((componentViewport?.height || 684) -
															170 -
															468.2) /
															2 +
															0 +
															0) +
														0 +
														86.2 +
														0 +
														0 +
														0 +
														139,
												},
												OtqoiJd06: {
													y:
														(componentViewport?.y || 0) +
														150 +
														0 +
														0 +
														71.2 +
														0 +
														0 +
														0,
												},
											},
											baseVariant,
											gestureVariant,
										)}
									>
										<SmartComponentScopedContainerWithFX
											__framer__animate={{
												transition: transition4,
											}}
											__framer__animateOnce={true}
											__framer__enter={animation}
											__framer__styleAppearEffectEnabled={true}
											__framer__threshold={0.5}
											__perspectiveFX={false}
											__smartComponentFX={true}
											__targetOpacity={1}
											className={"framer-1o742yd-container"}
											layoutDependency={layoutDependency}
											layoutId={"fRrsww0wH-container"}
											nodeId={"fRrsww0wH"}
											rendersWithMotion={true}
											scopeId={"vhCjmM3G7"}
											{...addPropertyOverrides(
												{
													OtqoiJd06: {
														__framer__threshold: 0,
													},
												},
												baseVariant,
												gestureVariant,
											)}
										>
											{_jsx(stdin_default, {
												height: "100%",
												id: "fRrsww0wH",
												IOMocQpEh: "$250M+",
												layoutId: "fRrsww0wH",
												variant: "TwYCDqD7T",
												vCgcTaJbS: "Assets Managed",
												width: "100%",
												...addPropertyOverrides(
													{
														fRvvpqAuJ: {
															variant: "zcYR2_vFP",
														},
													},
													baseVariant,
													gestureVariant,
												),
											})}
										</SmartComponentScopedContainerWithFX>
									</ComponentViewportProvider>
									<ComponentViewportProvider
										height={104}
										y={
											(componentViewport?.y || 0) +
											220 +
											0 +
											0 +
											89.2 +
											0 +
											0 +
											0
										}
										{...addPropertyOverrides(
											{
												fRvvpqAuJ: {
													y:
														(componentViewport?.y || 0) +
														120 +
														(((componentViewport?.height || 684) -
															170 -
															468.2) /
															2 +
															0 +
															0) +
														0 +
														86.2 +
														0 +
														0 +
														0 +
														278,
												},
												OtqoiJd06: {
													y:
														(componentViewport?.y || 0) +
														150 +
														0 +
														0 +
														71.2 +
														0 +
														0 +
														0,
												},
											},
											baseVariant,
											gestureVariant,
										)}
									>
										<SmartComponentScopedContainerWithFX
											__framer__animate={{
												transition: transition4,
											}}
											__framer__animateOnce={true}
											__framer__enter={animation}
											__framer__styleAppearEffectEnabled={true}
											__framer__threshold={0.5}
											__perspectiveFX={false}
											__smartComponentFX={true}
											__targetOpacity={1}
											className={"framer-1humiq1-container"}
											layoutDependency={layoutDependency}
											layoutId={"cnpXwY4rT-container"}
											nodeId={"cnpXwY4rT"}
											rendersWithMotion={true}
											scopeId={"vhCjmM3G7"}
											{...addPropertyOverrides(
												{
													OtqoiJd06: {
														__framer__threshold: 0,
													},
												},
												baseVariant,
												gestureVariant,
											)}
										>
											{_jsx(stdin_default, {
												height: "100%",
												id: "cnpXwY4rT",
												IOMocQpEh: "120+",
												layoutId: "cnpXwY4rT",
												variant: "TwYCDqD7T",
												vCgcTaJbS: "Automated Strategies",
												width: "100%",
												...addPropertyOverrides(
													{
														fRvvpqAuJ: {
															variant: "zcYR2_vFP",
														},
													},
													baseVariant,
													gestureVariant,
												),
											})}
										</SmartComponentScopedContainerWithFX>
									</ComponentViewportProvider>
								</motion.div>
							</motion.div>
						</motion.div>
						<motion.div
							className={"framer-padrz3"}
							data-framer-name={"Grid"}
							layoutDependency={layoutDependency}
							layoutId={"lapRRE5D5"}
						>
							<ComponentViewportProvider
								height={800}
								width={componentViewport?.width || "100vw"}
								y={(componentViewport?.y || 0) + 0 + 0}
								{...addPropertyOverrides(
									{
										fRvvpqAuJ: {
											height: (componentViewport?.height || 684) * 1 * 1,
										},
										OtqoiJd06: {
											height: (componentViewport?.height || 421) * 1 * 1,
										},
									},
									baseVariant,
									gestureVariant,
								)}
							>
								<SmartComponentScopedContainer
									className={"framer-18lehov-container"}
									layoutDependency={layoutDependency}
									layoutId={"I_fkUS_r8-container"}
									nodeId={"I_fkUS_r8"}
									rendersWithMotion={true}
									scopeId={"vhCjmM3G7"}
								>
									{_jsx(stdin_default2, {
										height: "100%",
										id: "I_fkUS_r8",
										layoutId: "I_fkUS_r8",
										style: {
											height: "100%",
											width: "100%",
										},
										variant: "hdexXEO_X",
										width: "100%",
										...addPropertyOverrides(
											{
												fRvvpqAuJ: {
													variant: "mWhcw8lXH",
												},
												OtqoiJd06: {
													variant: "QYQ1r9X7u",
												},
											},
											baseVariant,
											gestureVariant,
										),
									})}
								</SmartComponentScopedContainer>
							</ComponentViewportProvider>
						</motion.div>
					</motion.section>
				</Transition>
			</Variants>
		</LayoutGroup>
	);
});
var css2 = [
	"@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
	".framer-Tqu6U.framer-16nofxx, .framer-Tqu6U .framer-16nofxx { display: block; }",
	".framer-Tqu6U.framer-1fvnu53 { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 70px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 220px 100px 50px 100px; position: relative; width: 1200px; }",
	".framer-Tqu6U .framer-nxlf1j { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 43px; height: min-content; justify-content: flex-start; max-width: 1100px; overflow: visible; padding: 0px; position: relative; width: 100%; z-index: 1; }",
	".framer-Tqu6U .framer-1kj9rp9 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; z-index: 1; }",
	".framer-Tqu6U .framer-tkkfp8 { flex: 1.2 0 0px; height: auto; max-width: 600px; position: relative; white-space: pre-wrap; width: 1px; word-break: break-word; word-wrap: break-word; z-index: 1; }",
	".framer-Tqu6U .framer-v864au { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; z-index: 1; }",
	".framer-Tqu6U .framer-6vh5bz { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; overflow: visible; padding: 0px; position: relative; width: 100%; }",
	".framer-Tqu6U .framer-1i3s4lk-container, .framer-Tqu6U .framer-1o742yd-container, .framer-Tqu6U .framer-1humiq1-container { flex: none; height: auto; position: relative; width: auto; }",
	".framer-Tqu6U .framer-padrz3 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 800px; justify-content: center; overflow: hidden; padding: 0px; position: absolute; right: 0px; top: 0px; width: 100%; z-index: 0; }",
	".framer-Tqu6U .framer-18lehov-container { flex: none; height: 100%; left: calc(50.00000000000002% - 100% / 2); position: absolute; top: 0px; width: 100%; z-index: 0; }",
	".framer-Tqu6U.framer-v-1y6mng5.framer-1fvnu53 { gap: 50px; padding: 150px 40px 50px 40px; width: 810px; }",
	".framer-Tqu6U.framer-v-1y6mng5 .framer-nxlf1j { gap: 25px; max-width: 810px; order: 0; }",
	".framer-Tqu6U.framer-v-1y6mng5 .framer-1kj9rp9 { gap: 21px; order: 0; }",
	".framer-Tqu6U.framer-v-1y6mng5 .framer-tkkfp8 { flex: 1 0 0px; max-width: 550px; }",
	".framer-Tqu6U.framer-v-1y6mng5 .framer-v864au { order: 1; }",
	".framer-Tqu6U.framer-v-1y6mng5 .framer-padrz3 { height: 100%; order: 1; }",
	".framer-Tqu6U.framer-v-tfloyz.framer-1fvnu53 { gap: 120px; justify-content: center; padding: 120px 20px 50px 20px; width: 390px; }",
	".framer-Tqu6U.framer-v-tfloyz .framer-nxlf1j { gap: 40px; justify-content: center; max-width: 540px; }",
	".framer-Tqu6U.framer-v-tfloyz .framer-1kj9rp9 { align-content: center; align-items: center; flex-direction: column; gap: 22px; order: 0; z-index: 3; }",
	".framer-Tqu6U.framer-v-tfloyz .framer-tkkfp8 { flex: none; max-width: unset; width: 100%; }",
	".framer-Tqu6U.framer-v-tfloyz .framer-v864au { gap: 15px; max-width: 600px; order: 1; }",
	".framer-Tqu6U.framer-v-tfloyz .framer-6vh5bz { flex-direction: column; gap: 35px; justify-content: flex-start; }",
	".framer-Tqu6U.framer-v-tfloyz .framer-padrz3 { height: 100%; }",
	...css,
];
var FramervhCjmM3G7 = withCSS(Component, css2, "framer-Tqu6U");
var stdin_default3 = FramervhCjmM3G7;
FramervhCjmM3G7.displayName = "Metrics Section";
FramervhCjmM3G7.defaultProps = {
	height: 509,
	width: 1200,
};
addPropertyControls(FramervhCjmM3G7, {
	variant: {
		options: ["RbAa9puV7", "OtqoiJd06", "fRvvpqAuJ"],
		optionTitles: ["Desktop", "Tablet", "Phone"],
		title: "Variant",
		type: ControlType.Enum,
	},
});
addFonts(
	FramervhCjmM3G7,
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
		...MetricsFonts,
		...GridFonts,
		...getFontsFromSharedStyle(fonts),
	],
	{
		supportsExplicitInterCodegen: true,
	},
);

// virtual:metrics-section
import { WithFramerBreakpoints } from "unframer";
import { jsx } from "react/jsx-runtime";
var locales = [];
var defaultResponsiveVariants = {
	base: "fRvvpqAuJ",
	md: "OtqoiJd06",
	xl: "RbAa9puV7",
};
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
 * Renders MetricsSectionFramerComponent for all breakpoints with a variants map. Variant prop is inferred per breakpoint.
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
var metrics_section_default = ComponentWithRoot;
export { metrics_section_default as default };
