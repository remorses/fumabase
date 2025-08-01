// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project dfa04aa1c5bdec07 "Jet - SaaS Template (copy)", do not edit manually */
"use client";

import {
	stdin_default as stdin_default2,
	stdin_default2 as stdin_default3,
	stdin_default3 as stdin_default4,
} from "./chunks/chunk-7D6ZUPOD.js";
import "./chunks/chunk-D4336PTI.js";
import "./chunks/chunk-ATDUJXYA.js";
import "./chunks/chunk-MFJ4W77Q.js";
import { className, css, fonts } from "./chunks/chunk-OUEV7UWA.js";
import {
	className as className2,
	css as css2,
	fonts as fonts2,
} from "./chunks/chunk-EAOTBDPC.js";
import { stdin_default } from "./chunks/chunk-5PWCC3XC.js";
import "./chunks/chunk-R527CHIA.js";
import {
	className as className3,
	css as css3,
	fonts as fonts3,
} from "./chunks/chunk-QKWA2WC3.js";

// virtual:comparison-cell
import { Fragment as Fragment2 } from "react";
import { ContextProviders } from "unframer";

// /:https://framerusercontent.com/modules/kQyuXGc43wTJEdmTbyos/1FQfLA7tRccjA0LM1h3p/u9g7Rra_M.js
import {
	jsx as _jsx,
	jsxs as _jsxs,
	Fragment as _Fragment,
} from "react/jsx-runtime";
import {
	addFonts,
	addPropertyControls,
	ComponentViewportProvider,
	ControlType,
	cx,
	Floating,
	getFonts,
	getFontsFromSharedStyle,
	getPropertyControls,
	RichText,
	SmartComponentScopedContainer,
	useActiveVariantCallback,
	useComponentViewport,
	useLocaleInfo,
	useOverlayState,
	useVariantState,
	withCSS,
	withFX,
} from "unframer";
import {
	AnimatePresence,
	LayoutGroup,
	motion,
	MotionConfigContext,
} from "unframer";
import * as React from "react";
import { useRef as useRef2 } from "react";
var MainSiteGridBorderFonts = getFonts(stdin_default);
var InfoFonts = getFonts(stdin_default3);
var TooltipFonts = getFonts(stdin_default2);
var MotionDivWithFX = withFX(motion.div);
var ComparisonInfoIconFonts = getFonts(stdin_default4);
var ComparisonInfoIconControls = getPropertyControls(stdin_default4);
var MainSiteGridBorderControls = getPropertyControls(stdin_default);
var cycleOrder = [
	"nfivJgRFp",
	"UccUI26Fx",
	"euJaCXI3W",
	"aQVtlUK3s",
	"EzI3rHVQa",
	"pgC0zQJoP",
];
var serializationHash = "framer-IJiRQ";
var variantClassNames = {
	aQVtlUK3s: "framer-v-13tefsr",
	euJaCXI3W: "framer-v-h2h6is",
	EzI3rHVQa: "framer-v-r47geq",
	nfivJgRFp: "framer-v-tsvahb",
	pgC0zQJoP: "framer-v-gul4xc",
	UccUI26Fx: "framer-v-1fwniw5",
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
var convertFromBoolean = (value, activeLocale) => {
	if (value) {
		return "0px";
	} else {
		return "0px 0px 0px 16px";
	}
};
var numberToPixelString = (value) => {
	if (typeof value !== "number") return value;
	if (!Number.isFinite(value)) return void 0;
	return Math.max(0, value) + "px";
};
var convertFromBoolean1 = (value, activeLocale) => {
	if (value) {
		return "0px";
	} else {
		return "0px 0px 0px 8px";
	}
};
var negate = (value) => {
	return !value;
};
var isSet = (value) => {
	if (Array.isArray(value)) return value.length > 0;
	return value !== void 0 && value !== null && value !== "";
};
var transition2 = {
	bounce: 0,
	delay: 0,
	duration: 0.25,
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
	transition: transition2,
	x: 0,
	y: 8,
};
var animation1 = {
	opacity: 1,
	rotate: 0,
	rotateX: 0,
	rotateY: 0,
	scale: 1,
	skewX: 0,
	skewY: 0,
	transition: transition2,
	x: 0,
	y: 0,
};
var animation2 = {
	opacity: 0,
	rotate: 0,
	rotateX: 0,
	rotateY: 0,
	scale: 1,
	skewX: 0,
	skewY: 0,
	x: 0,
	y: 8,
};
var Overlay = ({ children, blockDocumentScrolling, enabled = true }) => {
	const [visible, setVisible] = useOverlayState({
		blockDocumentScrolling,
	});
	return children({
		hide: () => setVisible(false),
		show: () => setVisible(true),
		toggle: () => setVisible(!visible),
		visible: enabled && visible,
	});
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
var humanReadableEnumMap = {
	Checkmark: "oYA80aR0m",
	X: "H0qPPLZAy",
};
var humanReadableEnumMap1 = {
	"Left Right": "yQxqYG67k",
	"Right Bottom": "yzIFdYlxZ",
	"Top Bottom": "HWEDASjkO",
	"Top Left": "dNbszlCS9",
	All: "CLljGfTtP",
	Bottom: "oSdwqWnmP",
	Left: "tETbP_pro",
	Right: "NmV6whLcj",
	Top: "PsAciZ2BM",
};
var humanReadableVariantMap = {
	"Empty Mobile": "pgC0zQJoP",
	"Info Mobile": "EzI3rHVQa",
	"Name Mobile": "aQVtlUK3s",
	Empty: "euJaCXI3W",
	Info: "UccUI26Fx",
	Name: "nfivJgRFp",
};
var getProps = ({
	border,
	category,
	height,
	icon,
	id,
	info,
	select,
	title,
	tooltip,
	width,
	...props
}) => {
	return {
		...props,
		de67ue1JD: category ?? props.de67ue1JD,
		K8gRRrBIN: tooltip ?? props.K8gRRrBIN,
		p7K7zqxnH:
			humanReadableEnumMap1[border] ?? border ?? props.p7K7zqxnH ?? "yzIFdYlxZ",
		pb9vTViC1:
			humanReadableEnumMap[select] ?? select ?? props.pb9vTViC1 ?? "oYA80aR0m",
		SBuEMRmew: icon ?? props.SBuEMRmew,
		SjyXrqb3O: info ?? props.SjyXrqb3O ?? "Up to 10",
		variant:
			humanReadableVariantMap[props.variant] ?? props.variant ?? "nfivJgRFp",
		xvf4zUcWM: title ?? props.xvf4zUcWM ?? "Number of websites",
	};
};
var createLayoutDependency = (props, variants) => {
	if (props.layoutDependency)
		return variants.join("-") + props.layoutDependency;
	return variants.join("-");
};
var Component = /* @__PURE__ */ React.forwardRef(function (props, ref) {
	const fallbackRef = useRef2(null);
	const refBinding = ref ?? fallbackRef;
	const defaultLayoutId = React.useId();
	const { activeLocale, setLocale } = useLocaleInfo();
	const componentViewport = useComponentViewport();
	const {
		style,
		className: className4,
		layoutId,
		variant,
		de67ue1JD,
		xvf4zUcWM,
		K8gRRrBIN,
		SjyXrqb3O,
		SBuEMRmew,
		pb9vTViC1,
		p7K7zqxnH,
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
		defaultVariant: "nfivJgRFp",
		ref: refBinding,
		variant,
		variantClassNames,
	});
	const layoutDependency = createLayoutDependency(props, variants);
	const { activeVariantCallback, delay } =
		useActiveVariantCallback(baseVariant);
	const nc3N4L5qAtxyyif = ({ overlay, loadMore }) =>
		activeVariantCallback(async (...args) => {
			overlay.show();
		});
	const sharedStyleClassNames = [className3, className, className2];
	const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
	const isDisplayed = () => {
		if (["euJaCXI3W", "pgC0zQJoP"].includes(baseVariant)) return false;
		return true;
	};
	const padding = numberToPixelString(
		convertFromBoolean(de67ue1JD, activeLocale),
	);
	const padding1 = numberToPixelString(
		convertFromBoolean1(de67ue1JD, activeLocale),
	);
	const visible = negate(de67ue1JD);
	const visible1 = negate(SBuEMRmew);
	const isDisplayed1 = (value, value1) => {
		if (["UccUI26Fx", "EzI3rHVQa"].includes(baseVariant)) return value1;
		return value;
	};
	const isDisplayed2 = (value) => {
		if (["UccUI26Fx", "EzI3rHVQa"].includes(baseVariant)) return false;
		return value;
	};
	const visible2 = isSet(K8gRRrBIN);
	const ref1 = React.useRef(null);
	const ref2 = React.useRef(null);
	const isDisplayed3 = (value) => {
		if (["UccUI26Fx", "EzI3rHVQa"].includes(baseVariant)) return value;
		return false;
	};
	return (
		<LayoutGroup id={layoutId ?? defaultLayoutId}>
			<Variants animate={variants} initial={false}>
				<Transition value={transition1}>
					<motion.div
						{...restProps}
						{...gestureHandlers}
						className={cx(
							scopingClassNames,
							"framer-tsvahb",
							className4,
							classNames,
						)}
						data-framer-name={"Name"}
						layoutDependency={layoutDependency}
						layoutId={"nfivJgRFp"}
						ref={refBinding}
						style={{
							...style,
						}}
						{...addPropertyOverrides(
							{
								aQVtlUK3s: {
									"data-framer-name": "Name Mobile",
								},
								euJaCXI3W: {
									"data-framer-name": "Empty",
								},
								EzI3rHVQa: {
									"data-framer-name": "Info Mobile",
								},
								pgC0zQJoP: {
									"data-framer-name": "Empty Mobile",
								},
								UccUI26Fx: {
									"data-framer-name": "Info",
								},
							},
							baseVariant,
							gestureVariant,
						)}
					>
						<ComponentViewportProvider
							height={(componentViewport?.height || 90) - 0}
							width={componentViewport?.width || "100vw"}
							y={(componentViewport?.y || 0) + 0}
						>
							<SmartComponentScopedContainer
								className={"framer-1cnezty-container"}
								layoutDependency={layoutDependency}
								layoutId={"mfvQoZuL0-container"}
								nodeId={"mfvQoZuL0"}
								rendersWithMotion={true}
								scopeId={"u9g7Rra_M"}
							>
								{_jsx(stdin_default, {
									height: "100%",
									id: "mfvQoZuL0",
									layoutId: "mfvQoZuL0",
									style: {
										height: "100%",
										width: "100%",
									},
									variant: "yzIFdYlxZ",
									width: "100%",
									...addPropertyOverrides(
										{
											euJaCXI3W: {
												variant: p7K7zqxnH,
											},
											pgC0zQJoP: {
												variant: p7K7zqxnH,
											},
										},
										baseVariant,
										gestureVariant,
									),
								})}
							</SmartComponentScopedContainer>
						</ComponentViewportProvider>
						{isDisplayed() && (
							<motion.div
								className={"framer-1ud5on9"}
								data-framer-name={"Content"}
								layoutDependency={layoutDependency}
								layoutId={"UMvML7YCm"}
								style={{
									"--10ocmuz": padding,
									"--1reti8r": padding1,
								}}
							>
								{isDisplayed1(visible, visible1) && (
									<RichText
										__fromCanvasComponent={true}
										className={"framer-rkl1qt"}
										data-framer-name={"Feature"}
										fonts={["Inter"]}
										layoutDependency={layoutDependency}
										layoutId={"xfYhs_G0g"}
										style={{
											"--framer-link-text-color": "rgb(0, 153, 255)",
											"--framer-link-text-decoration": "underline",
										}}
										text={xvf4zUcWM}
										verticalAlignment={"top"}
										withExternalLayout={true}
										{...addPropertyOverrides(
											{
												aQVtlUK3s: {
													children: (
														<React.Fragment>
															<motion.p
																className={"framer-styles-preset-2pjocb"}
																data-styles-preset={"Dkr92TfXs"}
															>
																{"Number of websites"}
															</motion.p>
														</React.Fragment>
													),
												},
												EzI3rHVQa: {
													children: (
														<React.Fragment>
															<motion.p
																className={"framer-styles-preset-2pjocb"}
																data-styles-preset={"Dkr92TfXs"}
																style={{
																	"--framer-text-alignment": "center",
																}}
															>
																{"Up to 10"}
															</motion.p>
														</React.Fragment>
													),
													text: SjyXrqb3O,
												},
												UccUI26Fx: {
													children: (
														<React.Fragment>
															<motion.p
																className={"framer-styles-preset-c9mga6"}
																data-styles-preset={"Xa6VJQy2p"}
																style={{
																	"--framer-text-alignment": "center",
																}}
															>
																{"Up to 10"}
															</motion.p>
														</React.Fragment>
													),
													text: SjyXrqb3O,
												},
											},
											baseVariant,
											gestureVariant,
										)}
									>
										<React.Fragment>
											<motion.h5
												className={"framer-styles-preset-c9mga6"}
												data-styles-preset={"Xa6VJQy2p"}
											>
												{"Number of websites"}
											</motion.h5>
										</React.Fragment>
									</RichText>
								)}
								{isDisplayed2(de67ue1JD) && (
									<RichText
										__fromCanvasComponent={true}
										className={"framer-ogqm3h"}
										data-framer-name={"Category"}
										fonts={["Inter"]}
										layoutDependency={layoutDependency}
										layoutId={"lRt43iP6i"}
										style={{
											"--extracted-1eung3n":
												"var(--token-4fef9130-aa55-4351-8ed5-cfba481137a7, rgb(255, 255, 255))",
											"--framer-link-text-color": "rgb(0, 153, 255)",
											"--framer-link-text-decoration": "underline",
										}}
										text={xvf4zUcWM}
										variants={{
											aQVtlUK3s: {
												"--extracted-r6o4lv":
													"var(--token-4fef9130-aa55-4351-8ed5-cfba481137a7, rgb(255, 255, 255))",
											},
										}}
										verticalAlignment={"top"}
										withExternalLayout={true}
										{...addPropertyOverrides(
											{
												aQVtlUK3s: {
													children: (
														<React.Fragment>
															<motion.p
																className={"framer-styles-preset-2pjocb"}
																data-styles-preset={"Dkr92TfXs"}
																style={{
																	"--framer-text-color":
																		"var(--extracted-r6o4lv, var(--token-4fef9130-aa55-4351-8ed5-cfba481137a7, rgb(255, 255, 255)))",
																}}
															>
																{"Number of websites"}
															</motion.p>
														</React.Fragment>
													),
												},
											},
											baseVariant,
											gestureVariant,
										)}
									>
										<React.Fragment>
											<motion.h4
												className={"framer-styles-preset-d4fts2"}
												data-styles-preset={"bRzBDjLMv"}
												style={{
													"--framer-text-color":
														"var(--extracted-1eung3n, var(--token-4fef9130-aa55-4351-8ed5-cfba481137a7, rgb(255, 255, 255)))",
												}}
											>
												{"Number of websites"}
											</motion.h4>
										</React.Fragment>
									</RichText>
								)}
								{visible2 && (
									<Overlay blockDocumentScrolling={false}>
										{(overlay) => (
											<_Fragment>
												<ComponentViewportProvider
													height={24}
													width={"24px"}
													{...addPropertyOverrides(
														{
															aQVtlUK3s: {
																height: 18,
																width: "18.7826px",
															},
															EzI3rHVQa: {
																y:
																	(componentViewport?.y || 0) +
																	(12 +
																		((componentViewport?.height || 90) -
																			24 -
																			96) /
																			2) +
																	36,
															},
															UccUI26Fx: {
																y:
																	(componentViewport?.y || 0) +
																	(20 +
																		((componentViewport?.height || 90) -
																			40 -
																			105) /
																			2) +
																	40.5,
															},
														},
														baseVariant,
														gestureVariant,
													)}
												>
													<SmartComponentScopedContainer
														className={"framer-1n7u87h-container"}
														id={`${layoutId}-1n7u87h`}
														layoutDependency={layoutDependency}
														layoutId={"AU7MXAi4A-container"}
														nodeId={"AU7MXAi4A"}
														ref={ref1}
														rendersWithMotion={true}
														scopeId={"u9g7Rra_M"}
													>
														{_jsx(stdin_default3, {
															gqg_nvVwg: false,
															height: "100%",
															id: "AU7MXAi4A",
															layoutId: "AU7MXAi4A",
															nc3N4L5qA: nc3N4L5qAtxyyif({
																overlay,
															}),
															style: {
																height: "100%",
																width: "100%",
															},
															variant: overlay.visible
																? "wAbf6XDVH"
																: "N9BS4mTvb",
															width: "100%",
															...addPropertyOverrides(
																{
																	aQVtlUK3s: {
																		gqg_nvVwg: true,
																	},
																},
																baseVariant,
																gestureVariant,
															),
														})}
														<AnimatePresence>
															{overlay.visible && (
																<Floating
																	alignment={"center"}
																	anchorRef={ref1}
																	className={cx(scopingClassNames, classNames)}
																	collisionDetection={true}
																	collisionDetectionPadding={20}
																	data-framer-portal-id={`${layoutId}-1n7u87h`}
																	offsetX={0}
																	offsetY={-16}
																	onDismiss={overlay.hide}
																	placement={"top"}
																	safeArea={true}
																	zIndex={11}
																>
																	<MotionDivWithFX
																		__perspectiveFX={false}
																		__smartComponentFX={true}
																		__targetOpacity={1}
																		animate={animation1}
																		className={"framer-1kr9y2d"}
																		exit={animation}
																		initial={animation2}
																		layoutDependency={layoutDependency}
																		layoutId={"nbhx5RqYC"}
																		ref={ref2}
																		role={"dialog"}
																		style={{
																			borderBottomLeftRadius: 10,
																			borderBottomRightRadius: 10,
																			borderTopLeftRadius: 10,
																			borderTopRightRadius: 10,
																			boxShadow:
																				"0px 10px 20px 0px rgba(0, 0, 0, 0.05)",
																		}}
																	>
																		<ComponentViewportProvider width={"195px"}>
																			<SmartComponentScopedContainer
																				className={"framer-m7c4dc-container"}
																				inComponentSlot={true}
																				layoutDependency={layoutDependency}
																				layoutId={"W8MvuaNy0-container"}
																				nodeId={"W8MvuaNy0"}
																				rendersWithMotion={true}
																				scopeId={"u9g7Rra_M"}
																			>
																				{_jsx(stdin_default2, {
																					height: "100%",
																					id: "W8MvuaNy0",
																					K2SanH58l: K8gRRrBIN,
																					layoutId: "W8MvuaNy0",
																					style: {
																						width: "100%",
																					},
																					width: "100%",
																				})}
																			</SmartComponentScopedContainer>
																		</ComponentViewportProvider>
																	</MotionDivWithFX>
																</Floating>
															)}
														</AnimatePresence>
													</SmartComponentScopedContainer>
												</ComponentViewportProvider>
											</_Fragment>
										)}
									</Overlay>
								)}
								{isDisplayed3(SBuEMRmew) && (
									<ComponentViewportProvider
										{...addPropertyOverrides(
											{
												EzI3rHVQa: {
													height: 24,
													y:
														(componentViewport?.y || 0) +
														(12 +
															((componentViewport?.height || 90) - 24 - 96) /
																2) +
														36,
												},
												UccUI26Fx: {
													height: 24,
													y:
														(componentViewport?.y || 0) +
														(20 +
															((componentViewport?.height || 90) - 40 - 105) /
																2) +
														40.5,
												},
											},
											baseVariant,
											gestureVariant,
										)}
									>
										<SmartComponentScopedContainer
											className={"framer-12hxeua-container"}
											layoutDependency={layoutDependency}
											layoutId={"vGCFrINyT-container"}
											nodeId={"vGCFrINyT"}
											rendersWithMotion={true}
											scopeId={"u9g7Rra_M"}
										>
											{_jsx(stdin_default4, {
												height: "100%",
												id: "vGCFrINyT",
												layoutId: "vGCFrINyT",
												variant: pb9vTViC1,
												width: "100%",
											})}
										</SmartComponentScopedContainer>
									</ComponentViewportProvider>
								)}
							</motion.div>
						)}
					</motion.div>
				</Transition>
			</Variants>
		</LayoutGroup>
	);
});
var css4 = [
	"@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
	".framer-IJiRQ.framer-trnndh, .framer-IJiRQ .framer-trnndh { display: block; }",
	".framer-IJiRQ.framer-tsvahb { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 24px; height: 90px; justify-content: center; overflow: hidden; padding: 20px; position: relative; width: 292px; }",
	".framer-IJiRQ .framer-1cnezty-container { -webkit-user-select: none; bottom: 0px; flex: none; left: 0px; pointer-events: none; position: absolute; right: 0px; top: 0px; user-select: none; z-index: 2; }",
	".framer-IJiRQ .framer-1ud5on9 { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: min-content; justify-content: center; overflow: hidden; padding: var(--10ocmuz); position: relative; width: 1px; }",
	".framer-IJiRQ .framer-rkl1qt, .framer-IJiRQ .framer-ogqm3h { flex: 1 0 0px; height: auto; position: relative; white-space: pre-wrap; width: 1px; word-break: break-word; word-wrap: break-word; }",
	".framer-IJiRQ .framer-1n7u87h-container { aspect-ratio: 1.0434782608695652 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 24px); position: relative; width: 24px; }",
	".framer-IJiRQ .framer-1kr9y2d { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }",
	".framer-IJiRQ .framer-m7c4dc-container { flex: none; height: auto; position: relative; width: 195px; }",
	".framer-IJiRQ .framer-12hxeua-container { flex: none; height: auto; position: relative; width: auto; }",
	".framer-IJiRQ.framer-v-1fwniw5 .framer-1ud5on9, .framer-IJiRQ.framer-v-r47geq .framer-1ud5on9 { padding: 0px; }",
	".framer-IJiRQ.framer-v-13tefsr.framer-tsvahb, .framer-IJiRQ.framer-v-r47geq.framer-tsvahb, .framer-IJiRQ.framer-v-gul4xc.framer-tsvahb { padding: 12px; width: 292px; }",
	".framer-IJiRQ.framer-v-13tefsr .framer-1ud5on9 { padding: var(--1reti8r); }",
	".framer-IJiRQ.framer-v-13tefsr .framer-1n7u87h-container { height: var(--framer-aspect-ratio-supported, 18px); width: 19px; }",
	...css3,
	...css,
	...css2,
];
var Frameru9g7Rra_M = withCSS(Component, css4, "framer-IJiRQ");
var stdin_default5 = Frameru9g7Rra_M;
Frameru9g7Rra_M.displayName = "Comparison Cell";
Frameru9g7Rra_M.defaultProps = {
	height: 90,
	width: 292,
};
addPropertyControls(Frameru9g7Rra_M, {
	variant: {
		options: [
			"nfivJgRFp",
			"UccUI26Fx",
			"euJaCXI3W",
			"aQVtlUK3s",
			"EzI3rHVQa",
			"pgC0zQJoP",
		],
		optionTitles: [
			"Name",
			"Info",
			"Empty",
			"Name Mobile",
			"Info Mobile",
			"Empty Mobile",
		],
		title: "Variant",
		type: ControlType.Enum,
	},
	de67ue1JD: {
		defaultValue: false,
		description: "Set yes, if this is a category cell.",
		title: "Category",
		type: ControlType.Boolean,
	},
	xvf4zUcWM: {
		defaultValue: "Number of websites",
		displayTextArea: false,
		title: "Title",
		type: ControlType.String,
	},
	K8gRRrBIN: {
		defaultValue: "",
		displayTextArea: false,
		title: "Tooltip",
		type: ControlType.String,
	},
	SjyXrqb3O: {
		defaultValue: "Up to 10",
		displayTextArea: false,
		title: "Info",
		type: ControlType.String,
	},
	SBuEMRmew: {
		defaultValue: false,
		title: "Icon",
		type: ControlType.Boolean,
	},
	pb9vTViC1: ComparisonInfoIconControls?.["variant"] && {
		...ComparisonInfoIconControls["variant"],
		defaultValue: "oYA80aR0m",
		description: void 0,
		hidden: void 0,
		title: "Select",
	},
	p7K7zqxnH: MainSiteGridBorderControls?.["variant"] && {
		...MainSiteGridBorderControls["variant"],
		defaultValue: "yzIFdYlxZ",
		description: void 0,
		hidden: void 0,
		title: "Border",
	},
});
addFonts(
	Frameru9g7Rra_M,
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
		...MainSiteGridBorderFonts,
		...InfoFonts,
		...TooltipFonts,
		...ComparisonInfoIconFonts,
		...getFontsFromSharedStyle(fonts3),
		...getFontsFromSharedStyle(fonts),
		...getFontsFromSharedStyle(fonts2),
	],
	{
		supportsExplicitInterCodegen: true,
	},
);

// virtual:comparison-cell
import { WithFramerBreakpoints } from "unframer";
import { jsx } from "react/jsx-runtime";
var locales = [];
var defaultResponsiveVariants = {
	base: "UccUI26Fx",
};
stdin_default5.Responsive = ({ locale, ...rest }) => {
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
				Component={stdin_default5}
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
			{jsx(stdin_default5, {
				...rest,
			})}
		</ContextProviders>
	);
}
Object.assign(ComponentWithRoot, stdin_default5);
export { ComponentWithRoot as default };
