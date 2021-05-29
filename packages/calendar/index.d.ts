/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { Dimensions, Theme, Box, BoxAlign } from '@nivo/core'
import { LegendProps } from '@nivo/legends'

declare module '@nivo/calendar' {
    export type DateOrString = string | Date

    export interface CalendarDatum {
        day: string
        value: number
    }

    export interface CalendarData {
        from: DateOrString
        to: DateOrString
        data: CalendarDatum[]
    }

    type ValueFormatter = (
        datum: Omit<CalendarDayData, 'formattedValue' | 'label'>
    ) => string | number

    export type CalendarDirection = 'horizontal' | 'vertical'

    export type CalendarLegend = LegendProps & {
        itemCount: number
    }

    export type CalendarMouseHandler = (data: CalendarDayData, event: React.MouseEvent<any>) => void

    export interface CalendarDayData {
        date: Date
        day: string
        value?: number
        color: string
        size: number
        x: number
        y: number
    }

    export interface ColorScale {
        (value: number | { valueOf(): number }): any[]
        ticks(count?: number): number[]
    }

    export type CalendarCommonProps = Partial<{
        minValue: 'auto' | number
        maxValue: 'auto' | number

        direction: CalendarDirection
        colors: string[]
        colorScale: ColorScale
        margin: Box
        align: BoxAlign

        yearLegend: (year: number) => string | number
        yearSpacing: number
        yearLegendOffset: number
        yearLegendPosition: 'before' | 'after'

        monthSpacing: number
        monthBorderWidth: number
        monthBorderColor: string
        monthLegend: (year: number, month: number, date: Date) => string | number
        monthLegendOffset: number
        monthLegendPosition: 'before' | 'after'

        daySpacing: number
        dayBorderWidth: number
        dayBorderColor: string
        emptyColor: string

        isInteractive: boolean

        onClick?: CalendarMouseHandler
        onMouseMove?: CalendarMouseHandler
        onMouseLeave?: CalendarMouseHandler
        onMouseEnter?: CalendarMouseHandler

        tooltip: React.StatelessComponent<CalendarDayData>

        valueFormat?: string | ValueFormatter
        legendFormat?: string | ValueFormatter

        legends: CalendarLegend[]

        theme: Theme
    }>

    export type CalendarSvgProps = CalendarData &
        CalendarCommonProps &
        Partial<{
            onClick: (datum: CalendarDayData, event: React.MouseEvent<SVGRectElement>) => void
            role: string
        }>

    export class Calendar extends React.Component<CalendarSvgProps & Dimensions> { }
    export class ResponsiveCalendar extends React.Component<CalendarSvgProps> { }
    export class CalendarCanvas extends React.Component<CalendarSvgProps & Dimensions> { }
    export class ResponsiveCalendarCanvas extends React.Component<CalendarSvgProps> { }

    export type TimeRangeCommonProps = Partial<{
        minValue: 'auto' | number
        maxValue: 'auto' | number
        direction: CalendarDirection
        colors: string[]
        colorScale: ColorScale
        margin: Box
        square?: boolean
        daySpacing: number
        dayRadius: number
        dayBorderWidth: number
        dayBorderColor: string
        emptyColor: string
        isInteractive: boolean
        onClick?: CalendarMouseHandler
        onMouseMove?: CalendarMouseHandler
        onMouseLeave?: CalendarMouseHandler
        onMouseEnter?: CalendarMouseHandler
        tooltip: React.FunctionComponent<CalendarDayData>
        valueFormat?: string | ValueFormatter
        legendFormat?: string | ValueFormatter
        legends: CalendarLegend[]
        theme: Theme
        weekdayLegendsOffset: number
        monthLegend: (year: number, month: number, date: Date) => string | number
        monthLegendOffset: number
        monthLegendPosition: 'before' | 'after'
    }>

    export interface TimeRangeDatum {
        day: string
        date: Date
        value: number
    }

    export interface TimeRangeData {
        from: Date
        to: Date
        data: TimeRangeDatum[]
    }
    export type TimeRangeProps = TimeRangeData &
        TimeRangeCommonProps &
        Partial<{
            onClick: (datum: CalendarDayData, event: React.MouseEvent<SVGRectElement>) => void
            role: string
        }> &
        Dimensions

    export type TimeRangeSvgProps = TimeRangeData &
        TimeRangeCommonProps &
        Partial<{
            onClick: (datum: CalendarDayData, event: React.MouseEvent<SVGRectElement>) => void
            role: string
        }>

    export class ResponsiveTimeRange extends React.Component<TimeRangeSvgProps> { }
}
