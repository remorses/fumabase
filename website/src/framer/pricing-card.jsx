// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project 6ea1ba37e05fac32 "Fumabase website, made from Aset", do not edit manually */
"use client";

import { stdin_default } from "./chunks/chunk-WUWGZRWU.js";
import "./chunks/chunk-PHOGTW3T.js";
import "./chunks/chunk-SNH2M5FY.js";
import "./chunks/chunk-YL4V4VZK.js";
import "./chunks/chunk-IETFVNRG.js";
import "./chunks/chunk-BTSBQWPZ.js";
import "./chunks/chunk-EWWPQ2JC.js";
import "./chunks/chunk-KYATNZPG.js";

// virtual:pricing-card
import { Fragment } from "react";
import { ContextProviders } from "unframer";
import { WithFramerBreakpoints } from "unframer";
import { jsx } from "react/jsx-runtime";
var locales = [];
var defaultResponsiveVariants = {
	base: "LcAiuOOWL",
};
stdin_default.Responsive = ({ locale, ...rest }) => {
	return (
		<ContextProviders
			routes={{
				AxDvfLnyv: {
					path: "/page",
				},
				augiA20Il: {
					path: "/",
				},
				i9xm_305L: {
					path: "/page-2",
				},
				k9spuiW9M: {
					path: "/404",
				},
				p4p9Y1lWb: {
					path: "/login",
				},
			}}
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
function ComponentWithRoot({ locale, ...rest }) {
	return (
		<ContextProviders
			routes={{
				AxDvfLnyv: {
					path: "/page",
				},
				augiA20Il: {
					path: "/",
				},
				i9xm_305L: {
					path: "/page-2",
				},
				k9spuiW9M: {
					path: "/404",
				},
				p4p9Y1lWb: {
					path: "/login",
				},
			}}
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
Object.assign(ComponentWithRoot, stdin_default);
export { ComponentWithRoot as default };
