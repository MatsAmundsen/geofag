-- Hybrid CMS: editable "posts" that live in the database, alongside the
-- hardcoded interactive chapter pages. A post is rendered from Markdown at
-- request time, so edits show up immediately with no rebuild/redeploy.
--
-- This is the app's own schema (snake_case), applied to Neon during the deploy
-- build and to the local PGLite fallback on startup. Posts are global site
-- content authored by an admin, so there is no per-user `user_id` column;
-- writes are gated server-side behind an authenticated session.

create table if not exists posts (
  id serial primary key,
  slug text not null unique,
  title text not null,
  summary text not null default '',
  ingress text not null default '',
  thumbnail text not null default '',
  body_markdown text not null default '',
  -- 0 = draft (not published), 1 = published.
  published integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_idx on posts (published, created_at);

-- Seed the first hybrid post: a Markdown version of the Platetektonikk chapter,
-- used to test editing. The interactive chapter at /geofag-1/platetektonikk is
-- kept as-is; this is a separate, editable post at /poster/platetektonikk.
-- Idempotent: never overwrites edits made after the first apply.
insert into posts (slug, title, summary, ingress, thumbnail, body_markdown, published)
values (
  'platetektonikk',
  'Platetektonikk',
  'Bevegelser i mantelen driver platene — konsekvensene skriver seg i jordskorpa.',
  'Jordas ytre skall er delt i plater som glir på astenosfæren; der de møtes, endres både skorpe og overflate.',
  '/images/gf1-platetektonikk.jpg',
  E'## Jordas lag og hva en plate egentlig er\n\nEn plate er ikke «et stykke skorpe». Den er **litosfære**: skorpe pluss den øvre, kalde og stive delen av mantelen. Litosfæren glir på **astenosfæren**, et varmere og mykere lag lenger ned i mantelen.\n\n- **Divergente grenser** — platene går fra hverandre. Ny havbunn dannes ved midthavsrygger.\n- **Konvergente grenser** — platene møtes. Subduksjon, dyphavsgrøfter og fjellkjeder.\n- **Transforme grenser** — platene glir sidelengs. Store forkastninger og jordskjelv.\n\n## Hva driver bevegelsen\n\nVarme fra jordas indre setter opp treg konveksjon i mantelen. Sammen med *ridge push* og *slab pull* trekker og skyver dette platene. Der trykket faller når mantelberg stiger, kan berget smelte — kilden til vulkanene langs mange plategrenser.\n\n![Midthavsrygg og plategrense](/images/gf1-platetektonikk.jpg)\n\n> Rediger denne teksten i redigeringsvisningen og lagre — endringen vises umiddelbart her, uten ny bygging.',
  1
)
on conflict (slug) do nothing;
