import { parse } from 'https://deno.land/std/encoding/csv.ts';
import { BufReader } from 'https://deno.land/std/io/bufio.ts';
import { join } from 'https://deno.land/std/path/mod.ts';
import { pick } from 'https://deno.land/x/lodash@4.17.15-es/lodash.js';

interface Planet {
    [key: string]: string;
}

let planets: Array<Planet>;

async function loadPlanetData() {
    const path = join('.', 'kepler_exoplanets_nasa.csv');

    const file = await Deno.open('../data/kepler_exoplanets_nasa.csv');
    const bufReader = new BufReader(file);

    const result = await parse(bufReader, {
        header: true,
        comment: '#'
    });

    Deno.close(file.rid);

    const planets = (result as Array<Planet>).filter(planet => {
        const planetaryRadius = Number(planet['koi_prad']);
        const stellarRadius = Number(planet['koi_srad']);
        const stellarMass = Number(planet['koi_smass']);

        return (
            planet['koi_disposition'] === 'CONFIRMED' &&
            planetaryRadius > 0.5 &&
            planetaryRadius < 1.5 &&
            stellarRadius > 0.98 &&
            stellarRadius < 1.02 &&
            stellarMass > 0.78 &&
            stellarMass < 1.04
        );
    });

    return planets.map(planet => {
        return pick(planet, ['kepler_name', 'koi_prad', 'koi_smass', 'koi_srad', 'koi_count', 'koi_steff']);
    });
}

planets = await loadPlanetData();
console.log(`${planets.length} habitable planets found!`);
