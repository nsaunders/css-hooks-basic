// @ts-nocheck

function transform(o) {
  for (const k in o) {
    if (k === "on") continue;

    const v = o[k];
    if (!v || typeof v !== "object") {
      continue;
    }

    transform(v);

    o.on = o.on || [];

    o.on.push([k, v]);
    delete o[k];

    if (v.on) {
      for (const l in v.on) {
        if (typeof v.on[l][0] === "string") {
          v.on[l][0] = { and: [k, v.on[l][0]] };
        } else {
          v.on[l][0].and.splice(0, 0, k);
        }
      }
      o.on.push(...v.on);
      delete v.on;
    }
  }
}

export function basic(css) {
  return function (...rules) {
    const rulesCopy = JSON.parse(JSON.stringify(rules));
    rulesCopy.forEach(transform);
    return css(...rulesCopy);
  };
}
