import React from 'react'

const makeIcon = (name) => (props) =>
  React.createElement(
    'svg',
    { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', ...props },
    React.createElement('rect', { width: 24, height: 24, fill: 'none' }),
    React.createElement('text', { x: 2, y: 16, fill: 'currentColor', style: { fontSize: 8 } }, name)
  )

// Only icons still imported by: Designjs.tsx, theme.tsx, learningai.tsx, OpenSourceModels.tsx
export const ArrowRight = makeIcon('ArrowRight')
export const Bitcoin = makeIcon('Bitcoin')
export const CheckCircle = makeIcon('CheckCircle')
export const ChevronRight = makeIcon('ChevronRight')
export const Code = makeIcon('Code')
export const Coins = makeIcon('Coins')
export const Ethereum = makeIcon('Ethereum')
export const Globe = makeIcon('Globe')
export const GraduationCap = makeIcon('GraduationCap')
export const Lock = makeIcon('Lock')
export const Network = makeIcon('Network')
export const Shield = makeIcon('Shield')
export const Sparkles = makeIcon('Sparkles')
export const Target = makeIcon('Target')
export const Users = makeIcon('Users')

const _default = {
  ArrowRight, Bitcoin, CheckCircle, ChevronRight, Code, Coins, Ethereum, Globe, GraduationCap, Lock, Network, Shield, Sparkles, Target, Users
}

export default _default
