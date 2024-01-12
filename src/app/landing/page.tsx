import Link from "next/link";

export default function Landing() {
  return (
    <div className="m-auto w-2/5 text-center">
      <p>
        <p className="italic">Aplikacja jest we wczesnej fazie rozwoju.</p>
        <br />
        <p>
          Aby zgłaszać błędy, propozycje oraz dowiadywać się o zmianach dołącz
          na{" "}
          <Link href={"https://discord.gg/fD7xM55CAC"} className="btn-link">
            serwer Discord projektu
          </Link>
          .
        </p>
        <p>
          Ułatwi to pracę mnie, jako deweloperowi oraz <b>Wam</b>, bo w końcu to
          narzędzie, z którego <b>Wy</b> będziecie korzystać.
        </p>
      </p>
      <br />
      <h2 className="text-xl font-bold">Słowo od autora</h2>
      <p className="italic">
        Jestem absolwentem ZSTI, aktualnie studiuję Informatykę na Politechnice
        Śląskiej. Przez 2 lata (3 i 4 klasę technikum) prowadziłem pomoc
        koleżeńską z matematyki. Z tego doświadczenia wiem, że czasem mimo
        wielkiej potrzeby, mało kto miał odwagę poprosić o pomoc.
        <br />
        Na przestrzeni tych kilku lat udało się pomóc naprawdę wielu osobom i to
        była zdecydowanie największa nagroda, którą z tego tytułu otrzymałem.
        Jedyne czego żałuję, to tego jak mało z nas było zaangażowanych w tą
        inicjatywę.
        <br />
        <br />
        Każdy z nas jest inny, każdy ma inne zainteresowania i mocne strony.
        Właśnie tu jest cała siła pomocy koleżeńskiej - niewielkim (lub nieco
        większym 💀) nakładem pracy możemy uratować kogoś od przerażającej
        kartkówki z polskiego, sprawdzianu z matmy, czy zbliżającej się, zawsze
        zdecydowanie za szybko, matury.
        <br />
        <br />
        Dlatego między dyrekcją a mną, kiedy jeszcze byłem uczniem, narodził się
        pomysł na ułatwienie <b>Wam</b> organizacji pomocy koleżeńskiej za pomocą tej aplikacji. Ma
        sprawić, że współpraca między <b>Wami</b> stanie bardziej społeczną sprawą. Niektórzy może
        słyszą o czymś takim pierwszy raz, a chętnie wzięliby w niej udział po
        jednej, albo po drugiej stronie.
        <br />
        <br />
        Tak, jak wspomniałem wyżej - jeśli napotkacie jakieś błędy, opiszcie je
        na Discordzie; jeśli macie jakieś pomysły na usprawnienie aplikacji czy
        dodanie jakiejś funkcjonalności - znów odsyłam na Discorda. W miarę
        możliwości (czyt. po sesji) zabiorę się za najważniejsze rzeczy. Każdy
        feedback mile widziany, w końcu to narzędzie, z którego <b>Wy</b>{" "}
        będziecie korzystać.
      </p>
      <br />
      <p className="text-xl font-bold">Pomagajcie i dajcie sobie pomóc!</p>
    </div>
  );
}
