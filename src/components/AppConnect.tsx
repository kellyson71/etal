import { site } from '@/data/site';
import { AppBadge } from './AppBadge';
import { AppPhone } from './AppPhone';

const steps = [
  'Entre com o SUAP ou crie uma conta de visitante.',
  'No dia, faça o credenciamento pelo app: é só ler o QR da recepção.',
  'Veja a programação e ache a sua sala no mapa do campus.',
];

export function AppConnect() {
  return (
    <section className="app field field--noite" id="app" data-tone="noite" aria-labelledby="app-title">
      <div className="app__text">
        <p className="app__label led">{site.app.name}</p>
        <h2 className="app__title" id="app-title" data-split="lines">
          Para participar do ETAL, você vai usar o app.
        </h2>
        <ol className="app__steps">
          {steps.map((step, i) => (
            <li key={step}>
              <span className="app__num led" aria-hidden="true">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="app__acts">
          <a className="cta cta--open" href={site.app.url} target="_blank" rel="noopener noreferrer" data-magnetic="0.2">
            <span className="cta__dot" aria-hidden="true" />
            <span>Abrir o {site.app.name}</span>
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
          <p className="app__host">{site.app.host}</p>
        </div>
      </div>
      <AppBadge url={site.app.url}>
        <AppPhone />
      </AppBadge>
    </section>
  );
}
