// @ts-ignore
import { lineCurvePropKeys } from '@nivo/core'
import { commonDefaultProps as defaults } from '@nivo/parallel-coordinates'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
import {
    chartDimensions,
    commonAccessibilityProps,
    ordinalColors,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
        help: 'Chart data.',
        type: 'object[] | Array[]',
        description: `
            You can pass either an array of objects or and array of arrays,
            each item will be a line on the chart.
            
            The way you extract the values from each item depends on \`variables\`,
            that's why the schema is pretty loose.
            
            Please note that for each item, there should be a value for each variable.
        `,
        required: true,
    },
    {
        key: 'variables',
        type: 'VariableSpec<Datum>[]',
        flavors: allFlavors,
        help: 'Variables configuration.',
        description: `
            Variables configuration, define accessor (\`key\`)
            and variable type. Type must be one of
            \`linear\` or \`point\`, \`linear\`
            variables are suitable for continuous numerical
            data such as age or cost while
            \`point\` variables are suitable for
            discrete values such as gender.
        `,
        group: 'Variables',
        required: true,
        control: {
            type: 'array',
            shouldCreate: false,
            shouldRemove: false,
            getItemTitle: (_index: number, values: any) => `${values.id} (${values.value})`,
            props: [
                {
                    key: 'id',
                    help: 'Variable id, unique identifier for this variable.',
                    flavors: allFlavors,
                    type: 'string',
                    required: true,
                    control: {
                        type: 'text',
                        disabled: true,
                    },
                },
                {
                    key: 'value',
                    help: 'Variable value, used to access to corresponding datum value.',
                    flavors: allFlavors,
                    type: 'string',
                    required: true,
                    control: {
                        type: 'text',
                        disabled: true,
                    },
                },
                {
                    key: 'min',
                    help: 'Min value.',
                    flavors: allFlavors,
                    type: `number | 'auto'`,
                    required: false,
                    control: {
                        type: 'switchableRange',
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -100,
                        max: 100,
                    },
                },
                {
                    key: 'max',
                    help: 'Max value of linear scale.',
                    flavors: allFlavors,
                    type: `number | 'auto'`,
                    required: false,
                    control: {
                        type: 'switchableRange',
                        disabledValue: 'auto',
                        defaultValue: 1000,
                        min: -100,
                        max: 100,
                    },
                },
            ],
        },
    },
    {
        key: 'layout',
        help: `Chart layout.`,
        flavors: allFlavors,
        type: 'string',
        required: false,
        defaultValue: defaults.layout,
        group: 'Base',
        control: {
            type: 'radio',
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'curve',
        help: 'Curve interpolation.',
        flavors: allFlavors,
        description: `
            Defines the curve factory to use for the line generator.
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.curve,
        group: 'Base',
        control: {
            type: 'choices',
            choices: lineCurvePropKeys.map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'axesTicksPosition',
        help: `Axes ticks position.`,
        flavors: allFlavors,
        type: `string`,
        required: false,
        defaultValue: defaults.axesTicksPosition,
        group: 'Base',
        control: {
            type: 'radio',
            choices: [
                { label: 'before', value: 'before' },
                { label: 'after', value: 'after' },
            ],
        },
    },
    ...chartDimensions(allFlavors),
    themeProperty(['svg', 'canvas']),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: defaults.colors,
    }),
    {
        key: 'lineWidth',
        help: 'Lines width.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.lineWidth,
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'lineOpacity',
        help: 'Lines opacity.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.lineOpacity,
        control: { type: 'opacity' },
        group: 'Style',
    },
    ...motionProperties(allFlavors, defaults),
    ...commonAccessibilityProps(allFlavors),
]

export const groups = groupProperties(props)
