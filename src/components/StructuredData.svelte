<!--
  Emits a single JSON-LD script block inside `<svelte:head>`. Use anywhere
  a page or layout needs structured data — Organization, LocalBusiness,
  Person, Event, BreadcrumbList, etc.

  Usage:
    <StructuredData data={{
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Ateliér Tomandlová',
      ...
    }} />

  For multiple schemas on one page, just render the component multiple times.
  Each invocation produces an independent JSON-LD block, which is the
  recommended approach (Google parses each block independently).
-->
<script lang="ts">
  // Permissive shape: JSON-LD is free-form. Keep the prop typed loosely so
  // callers can pass whatever schema.org payload they need without per-type
  // generics or assertions.
  export let data: Record<string, unknown> | Array<Record<string, unknown>>;

  // Escape the less-than character to its unicode escape sequence so any
  // string value containing the closing-script-tag pattern cannot terminate
  // the surrounding script tag. Standard inline-JSON-in-HTML mitigation.
  // The needle and replacement are both written via String.fromCharCode and
  // unicode escapes so the literal less-than character never appears in
  // source — keeps Svelte's template parser from misreading it as a tag.
  const NEEDLE = String.fromCharCode(0x3c);
  $: serialized = JSON.stringify(data).split(NEEDLE).join('\\u003c');
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${serialized}</script>`}
</svelte:head>
