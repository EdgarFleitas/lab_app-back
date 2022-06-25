CREATE TABLE IF NOT EXISTS public.rolusus
(
    rol_id integer NOT NULL DEFAULT nextval('prueba_pru_id_seq'::regclass),
    rol_fecha date,
    rol_descripcion character varying COLLATE pg_catalog."default",
    rol_usu integer,
    CONSTRAINT rolusus_pkey PRIMARY KEY (rol_id),
    CONSTRAINT rolusu_fk FOREIGN KEY (rol_usu)
        REFERENCES public.usuarios (usu_codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.rolusus
    OWNER to postgres;