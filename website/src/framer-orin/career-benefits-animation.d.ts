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
    "variant"?: 'Default' | 'Cycle (1)' | 'Cycle (2)' | 'Cycle (3)' | 'Cycle (4)' | 'Cycle (5)' | 'Cycle (6)'
}

const CareerBenefitsAnimationFramerComponent = (props: Props) => any

type VariantsMap = Partial<Record<UnframerBreakpoint, Props['variant']>> & { base: Props['variant'] }

CareerBenefitsAnimationFramerComponent.Responsive = (props: Omit<Props, 'variant'> & {variants?: VariantsMap}) => any

export default CareerBenefitsAnimationFramerComponent

