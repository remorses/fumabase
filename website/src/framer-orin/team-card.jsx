// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project dfa04aa1c5bdec07 "Jet - SaaS Template (copy)", do not edit manually */
"use client";

import { stdin_default as stdin_default3 } from "./chunks/chunk-4DXVMHPR.js";
import {
	className as className2,
	css as css2,
	fonts as fonts2,
} from "./chunks/chunk-T7POLAZE.js";
import { className, css, fonts } from "./chunks/chunk-QOHV43H4.js";
import { Dither } from "./chunks/chunk-25LPWLWQ.js";
import { stdin_default as stdin_default2 } from "./chunks/chunk-ALVRX4HO.js";
import { stdin_default } from "./chunks/chunk-LCDELW7M.js";
import "./chunks/chunk-R527CHIA.js";

// virtual:team-card
import { Fragment as Fragment2 } from "react";
import { ContextProviders } from "unframer";

// /:https://framerusercontent.com/modules/x6BUmxXaPfD8e3d6k1SN/RCOXFBFKU6YLAuw9E6Mb/OWWvy730z.js
import {
	jsx as _jsx,
	jsxs as _jsxs,
	Fragment as _Fragment,
} from "react/jsx-runtime";
import {
	addFonts,
	addPropertyControls,
	ChildrenCanSuspend,
	ComponentViewportProvider,
	ControlType,
	cx,
	getFonts,
	getFontsFromSharedStyle,
	PathVariablesContext,
	RichText,
	SmartComponentScopedContainer,
	useComponentViewport,
	useLocaleInfo,
	useQueryData,
	useVariantState,
	withCSS,
} from "unframer";
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";
var MainSiteGridBorderFonts = getFonts(stdin_default2);
var CardSelectorFonts = getFonts(stdin_default3);
var DitherFonts = getFonts(Dither);
var enabledGestures = {
	bkwUSIZfN: {
		hover: true,
	},
};
var cycleOrder = ["bkwUSIZfN", "vRBOwXOG0"];
var serializationHash = "framer-UigJD";
var variantClassNames = {
	bkwUSIZfN: "framer-v-1if0q3c",
	vRBOwXOG0: "framer-v-heq6ch",
};
function addPropertyOverrides(overrides, ...variants) {
	const nextOverrides = {};
	variants?.forEach(
		(variant) => variant && Object.assign(nextOverrides, overrides[variant]),
	);
	return nextOverrides;
}
var transition1 = {
	bounce: 0,
	delay: 0,
	duration: 0.4,
	type: "spring",
};
var transition2 = {
	bounce: 0,
	delay: 0.15,
	duration: 0.4,
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
var transition3 = {
	bounce: 0,
	delay: 0.175,
	duration: 0.4,
	type: "spring",
};
var toResponsiveImage = (value) => {
	if (
		typeof value === "object" &&
		value !== null &&
		typeof value.src === "string"
	) {
		return value;
	}
	return typeof value === "string"
		? {
				src: value,
			}
		: void 0;
};
var QueryData = ({ query: query2, pageSize, children }) => {
	const data = useQueryData(query2);
	return children(data);
};
var Variants = motion.create(React.Fragment);
var humanReadableVariantMap = {
	Default: "bkwUSIZfN",
	Phone: "vRBOwXOG0",
};
var getProps = ({ height, id, name1, profile, role, width, ...props }) => {
	return {
		...props,
		ftGgnt190: profile ?? props.ftGgnt190,
		rAtxE3u9_: name1 ?? props.rAtxE3u9_ ?? "Grace Lee",
		variant:
			humanReadableVariantMap[props.variant] ?? props.variant ?? "bkwUSIZfN",
		YQeJCLEeL: role ?? props.YQeJCLEeL ?? "SEO Strategist",
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
		rAtxE3u9_,
		YQeJCLEeL,
		ftGgnt190,
		RuahOgRY1rr81LuVlm,
		k2CHhHMeprr81LuVlm,
		idrr81LuVlm,
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
		defaultVariant: "bkwUSIZfN",
		enabledGestures,
		ref: refBinding,
		variant,
		variantClassNames,
	});
	const layoutDependency = createLayoutDependency(props, variants);
	const sharedStyleClassNames = [className, className2];
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
							"framer-1if0q3c",
							className3,
							classNames,
						)}
						data-framer-name={"Default"}
						layoutDependency={layoutDependency}
						layoutId={"bkwUSIZfN"}
						ref={refBinding}
						style={{
							...style,
						}}
						{...addPropertyOverrides(
							{
								"bkwUSIZfN-hover": {
									"data-framer-name": void 0,
								},
								vRBOwXOG0: {
									"data-framer-name": "Phone",
								},
							},
							baseVariant,
							gestureVariant,
						)}
					>
						<motion.div
							className={"framer-1pk9p6d"}
							data-framer-name={"Text"}
							layoutDependency={layoutDependency}
							layoutId={"jw1TYP9FP"}
						>
							<RichText
								__fromCanvasComponent={true}
								className={"framer-19h0rw3"}
								data-framer-name={"Name"}
								fonts={["Inter"]}
								layoutDependency={layoutDependency}
								layoutId={"plJJmEkwQ"}
								text={rAtxE3u9_}
								verticalAlignment={"top"}
								withExternalLayout={true}
								{...addPropertyOverrides(
									{
										vRBOwXOG0: {
											children: (
												<React.Fragment>
													<motion.p
														className={"framer-styles-preset-2pjocb"}
														data-styles-preset={"Dkr92TfXs"}
													>
														{"Grace Lee"}
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
									<motion.h3
										className={"framer-styles-preset-yplpmu"}
										data-styles-preset={"nmO3BT1ni"}
									>
										{"Grace Lee"}
									</motion.h3>
								</React.Fragment>
							</RichText>
							<motion.div
								className={"framer-16hcxfy"}
								data-framer-name={"Role"}
								layoutDependency={layoutDependency}
								layoutId={"WHhKIhxLZ"}
							>
								<Transition
									{...addPropertyOverrides(
										{
											"bkwUSIZfN-hover": {
												value: transition2,
											},
										},
										baseVariant,
										gestureVariant,
									)}
								>
									<RichText
										__fromCanvasComponent={true}
										className={"framer-7g9zl"}
										data-framer-name={"/"}
										fonts={["Inter"]}
										layoutDependency={layoutDependency}
										layoutId={"KBNoighML"}
										style={{
											"--extracted-r6o4lv":
												"var(--token-4fef9130-aa55-4351-8ed5-cfba481137a7, rgb(255, 255, 255))",
											opacity: 0,
										}}
										variants={{
											"bkwUSIZfN-hover": {
												opacity: 1,
											},
											vRBOwXOG0: {
												opacity: 1,
											},
										}}
										verticalAlignment={"top"}
										withExternalLayout={true}
										{...addPropertyOverrides(
											{
												vRBOwXOG0: {
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
																{"/"}
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
											<motion.p
												className={"framer-styles-preset-yplpmu"}
												data-styles-preset={"nmO3BT1ni"}
												style={{
													"--framer-text-color":
														"var(--extracted-r6o4lv, var(--token-4fef9130-aa55-4351-8ed5-cfba481137a7, rgb(255, 255, 255)))",
												}}
											>
												{"/"}
											</motion.p>
										</React.Fragment>
									</RichText>
								</Transition>
								<Transition
									{...addPropertyOverrides(
										{
											"bkwUSIZfN-hover": {
												value: transition3,
											},
										},
										baseVariant,
										gestureVariant,
									)}
								>
									<RichText
										__fromCanvasComponent={true}
										className={"framer-3ubnib"}
										data-framer-name={"Text"}
										fonts={["Inter"]}
										layoutDependency={layoutDependency}
										layoutId={"cUSX4ZzSr"}
										style={{
											"--extracted-r6o4lv":
												"var(--token-8acf10b0-fc55-42ff-8ac5-80a79dc47979, rgba(255, 255, 255, 0.5))",
											opacity: 0,
										}}
										text={YQeJCLEeL}
										variants={{
											"bkwUSIZfN-hover": {
												opacity: 1,
											},
											vRBOwXOG0: {
												opacity: 1,
											},
										}}
										verticalAlignment={"top"}
										withExternalLayout={true}
										{...addPropertyOverrides(
											{
												vRBOwXOG0: {
													children: (
														<React.Fragment>
															<motion.p
																className={"framer-styles-preset-2pjocb"}
																data-styles-preset={"Dkr92TfXs"}
																style={{
																	"--framer-text-alignment": "left",
																	"--framer-text-color":
																		"var(--extracted-r6o4lv, var(--token-8acf10b0-fc55-42ff-8ac5-80a79dc47979, rgba(255, 255, 255, 0.5)))",
																}}
															>
																{"SEO Strategist"}
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
											<motion.p
												className={"framer-styles-preset-yplpmu"}
												data-styles-preset={"nmO3BT1ni"}
												style={{
													"--framer-text-alignment": "left",
													"--framer-text-color":
														"var(--extracted-r6o4lv, var(--token-8acf10b0-fc55-42ff-8ac5-80a79dc47979, rgba(255, 255, 255, 0.5)))",
												}}
											>
												{"SEO Strategist"}
											</motion.p>
										</React.Fragment>
									</RichText>
								</Transition>
							</motion.div>
						</motion.div>
						<ComponentViewportProvider
							height={(componentViewport?.height || 389) - 0}
							width={componentViewport?.width || "100vw"}
							y={(componentViewport?.y || 0) + 0}
							{...addPropertyOverrides(
								{
									vRBOwXOG0: {
										height: (componentViewport?.height || 179.5) - 0,
									},
								},
								baseVariant,
								gestureVariant,
							)}
						>
							<SmartComponentScopedContainer
								className={"framer-1wct24g-container"}
								layoutDependency={layoutDependency}
								layoutId={"Jd_KxZm9P-container"}
								nodeId={"Jd_KxZm9P"}
								rendersWithMotion={true}
								scopeId={"OWWvy730z"}
							>
								{_jsx(stdin_default2, {
									height: "100%",
									id: "Jd_KxZm9P",
									layoutId: "Jd_KxZm9P",
									style: {
										height: "100%",
										width: "100%",
									},
									variant: "yzIFdYlxZ",
									width: "100%",
								})}
							</SmartComponentScopedContainer>
						</ComponentViewportProvider>
						<ComponentViewportProvider
							height={(componentViewport?.height || 389) - 0}
							width={componentViewport?.width || "100vw"}
							y={(componentViewport?.y || 0) + 0}
							{...addPropertyOverrides(
								{
									vRBOwXOG0: {
										height: (componentViewport?.height || 179.5) - 0,
									},
								},
								baseVariant,
								gestureVariant,
							)}
						>
							<SmartComponentScopedContainer
								className={"framer-1tqczis-container"}
								layoutDependency={layoutDependency}
								layoutId={"po4JBBsYG-container"}
								nodeId={"po4JBBsYG"}
								rendersWithMotion={true}
								scopeId={"OWWvy730z"}
							>
								{_jsx(stdin_default3, {
									height: "100%",
									id: "po4JBBsYG",
									layoutId: "po4JBBsYG",
									style: {
										height: "100%",
										width: "100%",
									},
									variant: "jcOPzl09p",
									width: "100%",
									...addPropertyOverrides(
										{
											"bkwUSIZfN-hover": {
												variant: "CCKwLQUhX",
											},
										},
										baseVariant,
										gestureVariant,
									),
								})}
							</SmartComponentScopedContainer>
						</ComponentViewportProvider>
						<motion.div
							className={"framer-1r13zrr"}
							data-framer-name={"Customization Frame"}
							layoutDependency={layoutDependency}
							layoutId={"rr81LuVlm"}
						>
							<ChildrenCanSuspend>
								<QueryData
									query={{
										from: {
											alias: "rr81LuVlm",
											data: stdin_default,
											type: "Collection",
										},
										limit: {
											type: "LiteralValue",
											value: 10,
										},
										select: [
											{
												collection: "rr81LuVlm",
												name: "RuahOgRY1",
												type: "Identifier",
											},
											{
												collection: "rr81LuVlm",
												name: "k2CHhHMep",
												type: "Identifier",
											},
											{
												collection: "rr81LuVlm",
												name: "id",
												type: "Identifier",
											},
										],
									}}
								>
									{(collection, paginationInfo, loadMore) => (
										<_Fragment>
											{collection?.map(
												(
													{
														id: idrr81LuVlm2,
														k2CHhHMep: k2CHhHMeprr81LuVlm2,
														RuahOgRY1: RuahOgRY1rr81LuVlm2,
													},
													index,
												) => {
													RuahOgRY1rr81LuVlm2 ??= "#09F";
													k2CHhHMeprr81LuVlm2 ??= "";
													return (
														<LayoutGroup id={`rr81LuVlm-${idrr81LuVlm2}`}>
															<PathVariablesContext.Provider
																value={{
																	k2CHhHMep: k2CHhHMeprr81LuVlm2,
																}}
															>
																<motion.div
																	className={"framer-15r4tf5"}
																	data-framer-name={"Content"}
																	layoutDependency={layoutDependency}
																	layoutId={"Bu7jq9gSs"}
																>
																	<ComponentViewportProvider>
																		<SmartComponentScopedContainer
																			className={"framer-jn9fyg-container"}
																			isAuthoredByUser={true}
																			isModuleExternal={true}
																			layoutDependency={layoutDependency}
																			layoutId={"zHra9Dhj6-container"}
																			nodeId={"zHra9Dhj6"}
																			rendersWithMotion={true}
																			scopeId={"OWWvy730z"}
																			style={{
																				filter: "grayscale(1)",
																				mask: "linear-gradient(15deg, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 62%) add",
																				WebkitFilter: "grayscale(1)",
																				WebkitMask:
																					"linear-gradient(15deg, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 62%) add",
																			}}
																			variants={{
																				"bkwUSIZfN-hover": {
																					filter: "grayscale(0)",
																					WebkitFilter: "grayscale(0)",
																				},
																			}}
																		>
																			<Dither
																				algorithm={"ordered"}
																				animation={{
																					canvasPreview: true,
																					enabled: false,
																					intensity: 10,
																					interval: 0.08,
																				}}
																				backgroundColor={
																					"var(--token-bb3f9735-47c4-4ac2-b002-c5446021aee6, rgb(0, 0, 0))"
																				}
																				brightness={-20}
																				dotColor={RuahOgRY1rr81LuVlm2}
																				enabled={true}
																				glow={30}
																				height={"100%"}
																				id={"zHra9Dhj6"}
																				image={toResponsiveImage(ftGgnt190)}
																				layoutId={"zHra9Dhj6"}
																				midtones={100}
																				pixelSize={3}
																				radius={"0px"}
																				style={{
																					height: "100%",
																					width: "100%",
																				}}
																				threshold={84}
																				width={"100%"}
																				{...addPropertyOverrides(
																					{
																						"bkwUSIZfN-hover": {
																							animation: {
																								canvasPreview: true,
																								enabled: true,
																								intensity: 5,
																								interval: 0.08,
																							},
																						},
																					},
																					baseVariant,
																					gestureVariant,
																				)}
																			/>
																		</SmartComponentScopedContainer>
																	</ComponentViewportProvider>
																</motion.div>
															</PathVariablesContext.Provider>
														</LayoutGroup>
													);
												},
											)}
										</_Fragment>
									)}
								</QueryData>
							</ChildrenCanSuspend>
						</motion.div>
					</motion.div>
				</Transition>
			</Variants>
		</LayoutGroup>
	);
});
var css3 = [
	"@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
	".framer-UigJD.framer-18ecbr1, .framer-UigJD .framer-18ecbr1 { display: block; }",
	".framer-UigJD.framer-1if0q3c { align-content: flex-start; align-items: flex-start; cursor: pointer; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: 389px; justify-content: flex-end; overflow: visible; padding: 34px; position: relative; width: 390px; }",
	".framer-UigJD .framer-1pk9p6d { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }",
	".framer-UigJD .framer-19h0rw3 { flex: none; height: auto; position: relative; white-space: pre; width: auto; z-index: 2; }",
	".framer-UigJD .framer-16hcxfy { align-content: center; align-items: center; bottom: 0px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 4px; height: min-content; justify-content: flex-start; left: 0px; min-height: 24px; overflow: visible; padding: 0px; position: absolute; right: 0px; z-index: 2; }",
	".framer-UigJD .framer-7g9zl { bottom: -30px; flex: none; height: auto; left: 0px; position: absolute; white-space: pre; width: auto; z-index: 2; }",
	".framer-UigJD .framer-3ubnib { bottom: -30px; flex: none; height: auto; left: 10px; position: absolute; right: 0px; white-space: pre-wrap; word-break: break-word; word-wrap: break-word; z-index: 2; }",
	".framer-UigJD .framer-1wct24g-container { -webkit-user-select: none; bottom: 0px; flex: none; left: 0px; pointer-events: none; position: absolute; right: 0px; top: 0px; user-select: none; z-index: 2; }",
	".framer-UigJD .framer-1tqczis-container { -webkit-user-select: none; bottom: 0px; flex: none; left: 0px; pointer-events: none; position: absolute; right: 0px; top: 0px; user-select: none; z-index: 4; }",
	".framer-UigJD .framer-1r13zrr { align-content: flex-start; align-items: flex-start; bottom: 0px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; justify-content: center; left: 0px; padding: 0px; position: absolute; right: 0px; top: 0px; z-index: 1; }",
	".framer-UigJD .framer-15r4tf5 { align-content: center; align-items: center; bottom: 0px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; justify-content: flex-start; left: 0px; padding: 0px; position: absolute; right: 0px; top: 0px; z-index: 1; }",
	".framer-UigJD .framer-jn9fyg-container { bottom: 10px; flex: none; left: 10px; position: absolute; right: 10px; top: 10px; }",
	".framer-UigJD.framer-v-heq6ch.framer-1if0q3c { aspect-ratio: 1.0025706940874035 / 1; cursor: unset; height: var(--framer-aspect-ratio-supported, 180px); padding: 16px; width: 180px; }",
	".framer-UigJD.framer-v-heq6ch .framer-16hcxfy { align-content: flex-start; align-items: flex-start; bottom: unset; left: unset; min-height: unset; position: relative; right: unset; width: 100%; }",
	".framer-UigJD.framer-v-heq6ch .framer-7g9zl, .framer-UigJD.framer-v-1if0q3c.hover .framer-7g9zl { bottom: unset; left: unset; position: relative; }",
	".framer-UigJD.framer-v-heq6ch .framer-3ubnib, .framer-UigJD.framer-v-1if0q3c.hover .framer-3ubnib { bottom: unset; flex: 1 0 0px; left: unset; position: relative; right: unset; width: 1px; }",
	".framer-UigJD.framer-v-1if0q3c.hover .framer-16hcxfy { bottom: unset; left: unset; min-height: unset; position: relative; right: unset; width: 100%; }",
	...css,
	...css2,
];
var FramerOWWvy730z = withCSS(Component, css3, "framer-UigJD");
var stdin_default4 = FramerOWWvy730z;
FramerOWWvy730z.displayName = "Team Card";
FramerOWWvy730z.defaultProps = {
	height: 389,
	width: 390,
};
addPropertyControls(FramerOWWvy730z, {
	variant: {
		options: ["bkwUSIZfN", "vRBOwXOG0"],
		optionTitles: ["Default", "Phone"],
		title: "Variant",
		type: ControlType.Enum,
	},
	rAtxE3u9_: {
		defaultValue: "Grace Lee",
		title: "Name",
		type: ControlType.String,
	},
	YQeJCLEeL: {
		defaultValue: "SEO Strategist",
		title: "Role",
		type: ControlType.String,
	},
	ftGgnt190: {
		title: "Profile",
		type: ControlType.ResponsiveImage,
	},
});
addFonts(
	FramerOWWvy730z,
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
		...CardSelectorFonts,
		...DitherFonts,
		...getFontsFromSharedStyle(fonts),
		...getFontsFromSharedStyle(fonts2),
	],
	{
		supportsExplicitInterCodegen: true,
	},
);

// virtual:team-card
import { WithFramerBreakpoints } from "unframer";
import { jsx } from "react/jsx-runtime";
var locales = [];
var defaultResponsiveVariants = {
	base: "vRBOwXOG0",
	xl: "bkwUSIZfN",
};
stdin_default4.Responsive = ({ locale, ...rest }) => {
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
				Component={stdin_default4}
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
			{jsx(stdin_default4, {
				...rest,
			})}
		</ContextProviders>
	);
}
Object.assign(ComponentWithRoot, stdin_default4);
export { ComponentWithRoot as default };
