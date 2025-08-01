/* This file was generated by Unframer, do not edit manually */
import * as React from "react"

import { UnframerBreakpoint } from "unframer"

type Locale = string
export interface Props {
    children?: React.ReactNode
    locale?: Locale
    style?: React.CSSProperties
    className?: string
    id?: string
    width?: any
    height?: any
    layoutId?: string
    "variant"?: 'Opened' | 'Closed'
    "question"?: string
    "answer"?: string
    "click"?: Function
    "mobile"?: boolean
}

const AccordionFramerComponent = (props: Props) => any

type VariantsMap = Partial<Record<UnframerBreakpoint, Props['variant']>> & { base: Props['variant'] }

AccordionFramerComponent.Responsive = (props: Omit<Props, 'variant'> & {variants?: VariantsMap}) => any

export default AccordionFramerComponent

