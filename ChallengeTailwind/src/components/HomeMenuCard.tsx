import React from 'react';
import { IonIcon, IonRouterLink } from '@ionic/react';

type HomeMenuCardProps = {
  href: string;
  icon: string;
  title: string;
  description: string;
  accent: string;
};

const HomeMenuCard: React.FC<HomeMenuCardProps> = ({
  href,
  icon,
  title,
  description,
  accent,
}) => {
  return (
    <IonRouterLink
      className="group block rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md active:scale-[0.99]"
      routerLink={href}
    >
      <div className="flex items-start gap-3">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg text-white ${accent}`}>
          <IonIcon className="text-xl" icon={icon} />
        </span>
        <div>
          <h2 className="font-semibold text-slate-950 group-hover:text-sky-700">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-5 text-slate-600">{description}</p>
        </div>
      </div>
    </IonRouterLink>
  );
};

export default HomeMenuCard;

