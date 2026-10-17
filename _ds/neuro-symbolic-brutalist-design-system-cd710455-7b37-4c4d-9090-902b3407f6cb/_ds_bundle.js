/* @ds-bundle: {"format":4,"namespace":"NeuroSymbolicBrutalistDesignSystem_cd7104","components":[{"name":"Barcode","sourcePath":"components/artifacts/Barcode.jsx"},{"name":"Crosshair","sourcePath":"components/artifacts/Crosshair.jsx"},{"name":"LogStream","sourcePath":"components/artifacts/LogStream.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Marker","sourcePath":"components/core/Marker.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Panel","sourcePath":"components/surfaces/Panel.jsx"},{"name":"StatReadout","sourcePath":"components/surfaces/StatReadout.jsx"}],"sourceHashes":{"components/artifacts/Barcode.jsx":"037b9deb4fb8","components/artifacts/Crosshair.jsx":"932e10e13378","components/artifacts/LogStream.jsx":"49ab18f9b908","components/core/Badge.jsx":"2453c92d714f","components/core/Button.jsx":"65466d999017","components/core/Marker.jsx":"aba4d3f1625c","components/data/DataTable.jsx":"aea2f8be6f24","components/forms/Checkbox.jsx":"3c4d7b456286","components/forms/Input.jsx":"f0ef7ab27760","components/forms/Select.jsx":"157d31b1eda5","components/forms/Switch.jsx":"5c4bb94271ed","components/surfaces/Panel.jsx":"4e51b6f4f81b","components/surfaces/StatReadout.jsx":"590289cb0ea7","ui_kits/research-site/ConsoleHero.jsx":"f9bfd4c1e02d","ui_kits/research-site/LogicArrays.jsx":"d6851aa6fd8c","ui_kits/research-site/Repository.jsx":"c15898d9b8ba","ui_kits/research-site/SiteChrome.jsx":"4b86019b730e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NeuroSymbolicBrutalistDesignSystem_cd7104 = window.NeuroSymbolicBrutalistDesignSystem_cd7104 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/artifacts/Barcode.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Barcode — a faux industrial barcode artifact (deterministic from `seed`).
 * Horizontal by default; set vertical for a spine-mounted code.
 */
function Barcode({
  seed = 'NSB-0001',
  height = 40,
  vertical = false,
  tone = 'bone',
  label,
  style,
  ...rest
}) {
  const bars = React.useMemo(() => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = h * 31 + seed.charCodeAt(i) >>> 0;
    const out = [];
    for (let i = 0; i < 46; i++) {
      h = h * 1103515245 + 12345 >>> 0;
      out.push(1 + h % 3); // width 1..3
    }
    return out;
  }, [seed]);
  const color = tone === 'accent' ? 'var(--accent)' : 'var(--text-body)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: '5px',
      fontFamily: 'var(--font-mono)',
      ...(vertical ? {
        transform: 'rotate(180deg)',
        writingMode: 'vertical-rl'
      } : {}),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '1px',
      height: vertical ? 'auto' : height,
      width: vertical ? height : 'auto',
      ...(vertical ? {
        flexDirection: 'column'
      } : {})
    }
  }, bars.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: vertical ? {
      height: w + 'px',
      width: '100%',
      background: i % 4 === 0 ? 'transparent' : color
    } : {
      width: w + 'px',
      height: '100%',
      background: i % 4 === 0 ? 'transparent' : color
    }
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '8px',
      letterSpacing: '0.22em',
      color: 'var(--text-faint)',
      textTransform: 'uppercase'
    }
  }, label));
}
Object.assign(__ds_scope, { Barcode });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/artifacts/Barcode.jsx", error: String((e && e.message) || e) }); }

// components/artifacts/Crosshair.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Crosshair — a [+] alignment marker. Decorative structural artifact. */
function Crosshair({
  size = 12,
  tone = 'accent',
  style,
  ...rest
}) {
  const c = tone === 'bone' ? 'var(--text-muted)' : 'var(--accent)';
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    style: {
      position: 'relative',
      display: 'inline-block',
      width: size,
      height: size,
      flex: '0 0 auto',
      color: c,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 0,
      width: '1px',
      height: '100%',
      background: 'currentColor',
      transform: 'translateX(-0.5px)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '50%',
      left: 0,
      height: '1px',
      width: '100%',
      background: 'currentColor',
      transform: 'translateY(-0.5px)'
    }
  }));
}
Object.assign(__ds_scope, { Crosshair });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/artifacts/Crosshair.jsx", error: String((e && e.message) || e) }); }

// components/artifacts/LogStream.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * LogStream — a running terminal/system log block. Each line: timestamp,
 * level tag, message. Levels color-coded (ok/warn/err/info).
 */
function LogStream({
  lines = [],
  style,
  ...rest
}) {
  const levelColor = {
    ok: 'var(--signal-ok)',
    warn: 'var(--signal-warn)',
    err: 'var(--signal-err)',
    info: 'var(--text-muted)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      lineHeight: 1.7,
      letterSpacing: '0.04em',
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      padding: '12px 14px',
      color: 'var(--text-body)',
      ...style
    }
  }, rest), lines.map((l, i) => {
    const line = typeof l === 'string' ? {
      msg: l
    } : l;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: '10px',
        whiteSpace: 'pre'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-faint)'
      }
    }, line.t || '·'), line.level && /*#__PURE__*/React.createElement("span", {
      style: {
        color: levelColor[line.level] || 'var(--text-muted)',
        textTransform: 'uppercase'
      }
    }, "[", line.level, "]"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: line.level === 'err' ? 'var(--signal-err)' : 'var(--text-body)'
      }
    }, line.msg));
  }));
}
Object.assign(__ds_scope, { LogStream });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/artifacts/LogStream.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — structural status/classification chip (e.g. R·RESTRICTED,
 * DOLBY DIGITAL). Mono, uppercase, hard 1px frame.
 */
function Badge({
  tone = 'accent',
  filled = false,
  children,
  style,
  ...rest
}) {
  const tones = {
    accent: {
      c: 'var(--accent)'
    },
    bone: {
      c: 'var(--text-body)'
    },
    ok: {
      c: 'var(--signal-ok)'
    },
    warn: {
      c: 'var(--signal-warn)'
    },
    muted: {
      c: 'var(--text-muted)'
    }
  };
  const t = tones[tone] || tones.accent;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'var(--font-mono)',
      fontSize: '9px',
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      lineHeight: 1,
      padding: '4px 8px',
      borderRadius: 'var(--r-none)',
      border: '1px solid ' + t.c,
      color: filled ? 'var(--on-accent)' : t.c,
      background: filled ? t.c : 'transparent',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — Neuro-Symbolic Brutalist action.
 * Sharp corners, mono uppercase label, structural framing.
 * The signature interaction: outline/ghost fill to hot-coral and
 * INVERT text on hover (bright accent-fill visual shock).
 */
function Button({
  variant = 'solid',
  size = 'md',
  disabled = false,
  marker = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const sizes = {
    sm: {
      padding: '6px 12px',
      fontSize: '10px'
    },
    md: {
      padding: '10px 18px',
      fontSize: '11px'
    },
    lg: {
      padding: '14px 26px',
      fontSize: '13px'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-mono)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    border: '1px solid',
    borderRadius: 'var(--r-none)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background var(--dur-fast) var(--ease-mech), color var(--dur-fast) var(--ease-mech), transform var(--dur-fast) var(--ease-mech)',
    transform: press && !disabled ? 'translate(1px, 1px)' : 'none',
    userSelect: 'none',
    ...sizes[size]
  };
  const skins = {
    solid: {
      background: hover ? 'var(--accent-press)' : 'var(--accent)',
      color: 'var(--on-accent)',
      borderColor: hover ? 'var(--accent-press)' : 'var(--accent)'
    },
    outline: {
      background: hover ? 'var(--accent)' : 'transparent',
      color: hover ? 'var(--on-accent)' : 'var(--text-body)',
      borderColor: hover ? 'var(--accent)' : 'var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: hover ? 'var(--accent)' : 'var(--text-muted)',
      borderColor: 'transparent'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...skins[variant],
      ...style
    }
  }, rest), marker && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "[+]"), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Marker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Marker — a section label with a technical prefix (e.g. "01. SEC_REF").
 * Wide-tracked mono, coral index. Pairs with headings per the spec.
 */
function Marker({
  index,
  children,
  tone = 'accent',
  style,
  ...rest
}) {
  const c = tone === 'bone' ? 'var(--text-muted)' : 'var(--accent)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      ...style
    }
  }, rest), index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      color: c,
      fontWeight: 700
    }
  }, index), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '24px',
      height: '1px',
      background: 'var(--border-strong)'
    }
  }), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Marker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Marker.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DataTable — dense structural database table (the "Repository").
 * Absolute 1px lines. Hovering a row triggers a bright coral fill with
 * inverted text — the signature visual shock from the spec.
 */
function DataTable({
  columns = [],
  rows = [],
  onRowClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(-1);
  const cellBase = {
    padding: '11px 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.04em',
    textAlign: 'left',
    borderBottom: '1px solid var(--border)',
    whiteSpace: 'nowrap'
  };
  return /*#__PURE__*/React.createElement("table", _extends({
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid var(--border-strong)',
      background: 'var(--surface-card)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      ...cellBase,
      fontSize: '9px',
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      borderBottom: '1px solid var(--border-strong)',
      width: c.width,
      textAlign: c.align || 'left'
    }
  }, "[", c.key || c.label, "]")))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, ri) => {
    const on = hover === ri;
    return /*#__PURE__*/React.createElement("tr", {
      key: ri,
      onMouseEnter: () => setHover(ri),
      onMouseLeave: () => setHover(-1),
      onClick: () => onRowClick && onRowClick(row, ri),
      style: {
        background: on ? 'var(--accent)' : 'transparent',
        cursor: onRowClick ? 'pointer' : 'default',
        transition: 'background var(--dur-fast) var(--ease-mech)'
      }
    }, columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
      key: ci,
      style: {
        ...cellBase,
        textAlign: c.align || 'left',
        color: on ? 'var(--on-accent)' : c.accent ? 'var(--accent)' : 'var(--text-body)',
        fontWeight: c.accent && !on ? 700 : 400
      }
    }, c.render ? c.render(row[c.key], row, on) : row[c.key])));
  })));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox — square, hard-cornered. Coral fill + [x] mark when checked. */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on, e);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    onClick: toggle,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      letterSpacing: '0.04em',
      color: 'var(--text-body)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      userSelect: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '16px',
      height: '16px',
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid ' + (on ? 'var(--accent)' : 'var(--border-strong)'),
      background: on ? 'var(--accent)' : 'transparent',
      color: 'var(--on-accent)',
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1,
      transition: 'background var(--dur-fast), border-color var(--dur-fast)'
    }
  }, on ? '×' : ''), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — telemetry field. Mono uppercase label, chamber background,
 * 1px frame that lights coral on focus (cathode bloom).
 */
function Input({
  label,
  hint,
  prefix,
  invalid = false,
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  const borderColor = invalid ? 'var(--signal-err)' : focus ? 'var(--accent)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      display: 'block',
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '9px',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)'
    }
  }, hint)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      border: '1px solid ' + borderColor,
      background: 'var(--bg-elevated)',
      boxShadow: focus ? 'var(--glow-coral)' : 'none',
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)'
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px',
      fontSize: '10px',
      color: 'var(--accent)',
      borderRight: '1px solid var(--border)',
      letterSpacing: '0.1em'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--text-body)',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      letterSpacing: '0.02em',
      padding: '10px 12px'
    }
  }, rest))));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Select — dropdown styled to match Input. Native select, mono, hard frame. */
function Select({
  label,
  hint,
  children,
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      display: 'block',
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '9px',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)'
    }
  }, hint)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block',
      border: '1px solid ' + (focus ? 'var(--accent)' : 'var(--border-strong)'),
      background: 'var(--bg-elevated)',
      boxShadow: focus ? 'var(--glow-coral)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      width: '100%',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--text-body)',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      letterSpacing: '0.02em',
      padding: '10px 34px 10px 12px',
      cursor: 'pointer'
    }
  }, rest), children), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--accent)',
      fontSize: '10px',
      pointerEvents: 'none'
    }
  }, "\u25BC")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Switch — rigid rectangular toggle (no pill radius). Coral track when ON. */
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on, e);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    onClick: toggle,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      userSelect: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: '40px',
      height: '18px',
      flex: '0 0 auto',
      border: '1px solid ' + (on ? 'var(--accent)' : 'var(--border-strong)'),
      background: on ? 'var(--accent)' : 'transparent',
      transition: 'background var(--dur-fast), border-color var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '1px',
      bottom: '1px',
      width: '16px',
      left: on ? '22px' : '1px',
      background: on ? 'var(--on-accent)' : 'var(--text-muted)',
      transition: 'left var(--dur-base) var(--ease-snap)'
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label, ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: on ? 'var(--accent)' : 'var(--text-faint)'
    }
  }, "[", on ? 'ON' : 'OFF', "]")));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Panel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Panel — the core chamber container. 1px frame, optional header bar
 * with title + right-aligned meta, and optional corner crosshairs.
 * The structural building block for terminal cards and sections.
 */
function Panel({
  title,
  meta,
  corners = true,
  accent = false,
  children,
  style,
  bodyStyle,
  ...rest
}) {
  const cross = pos => /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      width: '7px',
      height: '7px',
      color: accent ? 'var(--accent)' : 'var(--text-faint)',
      ...pos
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 0,
      width: '1px',
      height: '100%',
      background: 'currentColor',
      transform: 'translateX(-0.5px)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '50%',
      left: 0,
      height: '1px',
      width: '100%',
      background: 'currentColor',
      transform: 'translateY(-0.5px)'
    }
  }));
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      border: '1px solid ' + (accent ? 'var(--accent)' : 'var(--border-strong)'),
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, rest), corners && /*#__PURE__*/React.createElement(React.Fragment, null, cross({
    top: '-4px',
    left: '-4px'
  }), cross({
    top: '-4px',
    right: '-4px'
  }), cross({
    bottom: '-4px',
    left: '-4px'
  }), cross({
    bottom: '-4px',
    right: '-4px'
  })), (title || meta) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      padding: '10px 14px',
      borderBottom: '1px solid var(--border)',
      background: accent ? 'var(--accent)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: accent ? 'var(--on-accent)' : 'var(--text-body)'
    }
  }, title), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '9px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: accent ? 'var(--on-accent)' : 'var(--text-faint)'
    }
  }, meta)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px',
      color: 'var(--text-body)',
      ...bodyStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Panel.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/StatReadout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatReadout — a single telemetry metric: big value + mono label + delta.
 * Used in dashboards / hero data splits.
 */
function StatReadout({
  label,
  value,
  unit,
  delta,
  tone = 'bone',
  style,
  ...rest
}) {
  const valColor = tone === 'accent' ? 'var(--accent)' : 'var(--text-body)';
  const deltaColor = delta && delta.trim().startsWith('-') ? 'var(--signal-err)' : 'var(--signal-ok)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--font-mono)',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '9px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '38px',
      lineHeight: 0.9,
      letterSpacing: '-0.02em',
      color: valColor
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '11px',
      color: 'var(--text-muted)',
      letterSpacing: '0.08em'
    }
  }, unit)), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      letterSpacing: '0.06em',
      color: deltaColor
    }
  }, delta));
}
Object.assign(__ds_scope, { StatReadout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/StatReadout.jsx", error: String((e && e.message) || e) }); }

// ui_kits/research-site/ConsoleHero.jsx
try { (() => {
// ConsoleHero — Section 01: hero / bio panel with data split + dithered plate.
(function () {
  const {
    Marker,
    Badge,
    Crosshair,
    Button,
    StatReadout
  } = window.NeuroSymbolicBrutalistDesignSystem_cd7104;
  function ConsoleHero() {
    return /*#__PURE__*/React.createElement("section", {
      className: "tex-grain",
      style: {
        position: 'relative',
        padding: '56px 20px 40px',
        borderBottom: '1px solid var(--border-strong)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        backgroundImage: 'var(--tex-grid)',
        backgroundSize: '48px 48px',
        opacity: 0.5,
        pointerEvents: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1.25fr 0.75fr',
        gap: '40px',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Marker, {
      index: "01."
    }, "SEC_REF // THE_CONSOLE"), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: '18px 0 0',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'clamp(46px, 8vw, 104px)',
        lineHeight: 0.86,
        letterSpacing: '-0.035em',
        textTransform: 'uppercase',
        color: 'var(--bone-white)'
      }
    }, "COGNITIVE", /*#__PURE__*/React.createElement("br", null), "ARCHI", /*#__PURE__*/React.createElement("span", {
      style: {
        WebkitTextStroke: '2px var(--bone-white)',
        color: 'transparent'
      }
    }, "TECT")), /*#__PURE__*/React.createElement("p", {
      style: {
        maxWidth: '440px',
        marginTop: '22px',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        lineHeight: 1.7,
        letterSpacing: '0.02em',
        color: 'var(--bone-dim)'
      }
    }, "Researching ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--hot-coral)'
      }
    }, "neuro-symbolic"), " systems \u2014 fusing the statistical, emergent behavior of neural networks with the rigid, relational frameworks of symbolic logic."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: '12px',
        marginTop: '26px'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "solid",
      marker: true
    }, "VIEW REPOSITORY"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline"
    }, "DOWNLOAD CV")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: '34px',
        marginTop: '40px'
      }
    }, /*#__PURE__*/React.createElement(StatReadout, {
      label: "PUBLICATIONS",
      value: "24",
      tone: "accent"
    }), /*#__PURE__*/React.createElement(StatReadout, {
      label: "CITATIONS",
      value: "1.9",
      unit: "K"
    }), /*#__PURE__*/React.createElement(StatReadout, {
      label: "H-INDEX",
      value: "17"
    }))), /*#__PURE__*/React.createElement("figure", {
      style: {
        margin: 0,
        position: 'relative',
        border: '1px solid var(--hot-coral)',
        aspectRatio: '3/4',
        overflow: 'hidden',
        background: '#000'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/img/plate-eye-hands.webp",
      alt: "neuro-symbolic plate",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'grayscale(1) contrast(2.1) brightness(1.05)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'var(--hot-coral)',
        mixBlendMode: 'multiply',
        opacity: 0.22
      }
    }), /*#__PURE__*/React.createElement("figcaption", {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 10px',
        fontFamily: 'var(--font-mono)',
        fontSize: '8px',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--bone-white)',
        background: 'linear-gradient(transparent, rgba(0,0,0,.85))'
      }
    }, /*#__PURE__*/React.createElement("span", null, "FIG.01 \xB7 KNOWLEDGE_GRAPH"), /*#__PURE__*/React.createElement("span", null, "THRESHOLD")), /*#__PURE__*/React.createElement(Crosshair, {
      size: 14,
      style: {
        position: 'absolute',
        top: '8px',
        right: '8px'
      }
    }))));
  }
  Object.assign(window, {
    ConsoleHero
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/research-site/ConsoleHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/research-site/LogicArrays.jsx
try { (() => {
// LogicArrays — Section 03: research demo terminal cards.
(function () {
  const {
    Marker,
    Panel,
    Badge,
    LogStream,
    Button
  } = window.NeuroSymbolicBrutalistDesignSystem_cd7104;
  function LogicArrays() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: '48px 20px 56px',
        maxWidth: '1200px',
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement(Marker, {
      index: "03."
    }, "SEC_REF // LOGIC_ARRAYS"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: '14px 0 28px',
        fontFamily: 'var(--font-section)',
        fontWeight: 700,
        fontSize: '34px',
        letterSpacing: '-0.01em',
        color: 'var(--bone-white)'
      }
    }, "Research Demos"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '22px'
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "PROOF_SEARCH.v3",
      meta: "RUNNING"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        lineHeight: 1.7,
        color: 'var(--bone-dim)',
        marginBottom: '14px'
      }
    }, "Live neuro-symbolic theorem prover. Hybrid search over a learned heuristic + hard logical constraints."), /*#__PURE__*/React.createElement(LogStream, {
      lines: [{
        t: 'T+00',
        level: 'ok',
        msg: 'load axioms [128]'
      }, {
        t: 'T+01',
        level: 'info',
        msg: 'expand node ∴(a→b)'
      }, {
        t: 'T+02',
        level: 'ok',
        msg: 'QED — depth 7'
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '14px'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "OPEN DEMO"))), /*#__PURE__*/React.createElement(Panel, {
      title: "GRAPH_MAPPER",
      meta: "v0.9"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        lineHeight: 1.7,
        color: 'var(--bone-dim)',
        marginBottom: '14px'
      }
    }, "Renders knowledge graphs as 1px vector blueprints. Nodes are symbols; edges are learned relations."), /*#__PURE__*/React.createElement("div", {
      className: "tex-grid",
      style: {
        height: '128px',
        border: '1px solid var(--border)',
        backgroundSize: '20px 20px',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 200 120",
      width: "100%",
      height: "100%",
      style: {
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("g", {
      fill: "none",
      stroke: "var(--hot-coral)",
      strokeWidth: "1"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "40",
      cy: "60",
      r: "8"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "100",
      cy: "30",
      r: "8"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "100",
      cy: "90",
      r: "8"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "160",
      cy: "60",
      r: "8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M48 60 L92 33 M48 60 L92 87 M108 30 L152 57 M108 90 L152 63 M100 38 L100 82"
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '14px'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "OPEN DEMO"))), /*#__PURE__*/React.createElement(Panel, {
      title: "DITHER_ENGINE",
      meta: "STABLE",
      accent: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        lineHeight: 1.7,
        color: 'var(--bone-white)',
        marginBottom: '14px'
      }
    }, "Floyd\u2013Steinberg pipeline converting sensory input to binary machinic format."), /*#__PURE__*/React.createElement("img", {
      src: "../../assets/img/plate-norte-wireframe.jpg",
      alt: "dither sample",
      style: {
        width: '100%',
        height: '128px',
        objectFit: 'cover',
        border: '1px solid var(--border)',
        filter: 'grayscale(1) contrast(1.7)',
        imageRendering: 'pixelated'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '14px'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "solid",
      size: "sm"
    }, "OPEN DEMO")))));
  }
  Object.assign(window, {
    LogicArrays
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/research-site/LogicArrays.jsx", error: String((e && e.message) || e) }); }

// ui_kits/research-site/Repository.jsx
try { (() => {
// Repository — Section 02: publications database table.
(function () {
  const {
    Marker,
    DataTable,
    Badge
  } = window.NeuroSymbolicBrutalistDesignSystem_cd7104;
  function Repository() {
    const columns = [{
      key: 'index',
      label: 'INDEX',
      width: '64px',
      accent: true
    }, {
      key: 'year',
      label: 'YEAR',
      width: '70px'
    }, {
      key: 'venue',
      label: 'VENUE',
      width: '130px'
    }, {
      key: 'contribution',
      label: 'CORE_CONTRIBUTION'
    }, {
      key: 'code',
      label: 'CODE',
      width: '80px',
      align: 'right'
    }];
    const rows = [{
      index: '001',
      year: '2026',
      venue: 'AAAI',
      contribution: 'Symbolic grounding of visual perception',
      code: '[GH]'
    }, {
      index: '002',
      year: '2025',
      venue: 'NeurIPS',
      contribution: 'Differentiable logic layers at scale',
      code: '[GH]'
    }, {
      index: '003',
      year: '2025',
      venue: 'ICLR',
      contribution: 'Neuro-symbolic proof search agents',
      code: '[GH]'
    }, {
      index: '004',
      year: '2025',
      venue: 'ICML',
      contribution: 'Halftone latent compression for reasoning',
      code: '[--]'
    }, {
      index: '005',
      year: '2024',
      venue: 'ACL',
      contribution: 'Relational memory for language models',
      code: '[GH]'
    }, {
      index: '006',
      year: '2024',
      venue: 'CVPR',
      contribution: 'Dithered representations & robustness',
      code: '[GH]'
    }];
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: '48px 20px',
        borderBottom: '1px solid var(--border-strong)',
        maxWidth: '1200px',
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '22px'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Marker, {
      index: "02."
    }, "SEC_REF // THE_REPOSITORY"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: '14px 0 0',
        fontFamily: 'var(--font-section)',
        fontWeight: 700,
        fontSize: '34px',
        letterSpacing: '-0.01em',
        color: 'var(--bone-white)'
      }
    }, "Publications")), /*#__PURE__*/React.createElement(Badge, {
      tone: "ok"
    }, rows.length, " INDEXED \xB7 SORT: DESC")), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns,
      rows: rows,
      onRowClick: () => {}
    }));
  }
  Object.assign(window, {
    Repository
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/research-site/Repository.jsx", error: String((e && e.message) || e) }); }

// ui_kits/research-site/SiteChrome.jsx
try { (() => {
// SiteChrome — top nav + footer for the research site.
(function () {
  const {
    Badge,
    Crosshair,
    Barcode
  } = window.NeuroSymbolicBrutalistDesignSystem_cd7104;
  function SiteNav({
    active,
    onNav
  }) {
    const items = ['CONSOLE', 'REPOSITORY', 'LOGIC_ARRAYS', 'CONTACT'];
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-strong)',
        background: 'var(--bg)',
        fontFamily: 'var(--font-mono)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0 20px',
        borderRight: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement(Crosshair, {
      size: 12
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '18px',
        letterSpacing: '-0.02em',
        textTransform: 'uppercase',
        color: 'var(--bone-white)'
      }
    }, "SYSTEM", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--hot-coral)'
      }
    }, "\xB7"), "3")), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex'
      }
    }, items.map(it => {
      const on = active === it;
      return /*#__PURE__*/React.createElement("button", {
        key: it,
        onClick: () => onNav(it),
        style: {
          background: on ? 'var(--hot-coral)' : 'transparent',
          color: on ? 'var(--void-black)' : 'var(--bone-dim)',
          border: 'none',
          borderLeft: '1px solid var(--border)',
          padding: '0 22px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'background var(--dur-fast), color var(--dur-fast)'
        }
      }, it);
    })));
  }
  function SiteFooter() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border-strong)',
        padding: '20px',
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--bone-faint)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 SYSTEM\xB73 // COGNITIVE_ARCHITECT"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--signal-ok)'
      }
    }, "MEM_ALLOC: OK \xB7 UPTIME 99.98%"), /*#__PURE__*/React.createElement(Barcode, {
      seed: "SYSTEM-3-FOOTER",
      height: 26,
      label: "V2.1.0"
    }));
  }
  Object.assign(window, {
    SiteNav,
    SiteFooter
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/research-site/SiteChrome.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Barcode = __ds_scope.Barcode;

__ds_ns.Crosshair = __ds_scope.Crosshair;

__ds_ns.LogStream = __ds_scope.LogStream;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Marker = __ds_scope.Marker;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.StatReadout = __ds_scope.StatReadout;

})();
