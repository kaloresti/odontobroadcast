<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            AgendaSeeder::class,
            AssistenteSeeder::class,
            ConsultorioSeeder::class,
            DentistaSeeder::class,
            DentistaHasConsultorio::class,
            PacienteSeeder::class,
        ]);
    }
}
