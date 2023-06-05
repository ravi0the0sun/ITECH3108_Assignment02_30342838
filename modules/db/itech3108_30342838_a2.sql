--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: itech3108_30342838_a2; Type: DATABASE; Schema: -; Owner: sussybaka
--

CREATE DATABASE itech3108_30342838_a2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';


ALTER DATABASE itech3108_30342838_a2 OWNER TO sussybaka;

\connect itech3108_30342838_a2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ratings; Type: TYPE; Schema: public; Owner: sussybaka
--

CREATE TYPE public.ratings AS ENUM (
    '1',
    '2',
    '3',
    '4',
    '5'
);


ALTER TYPE public.ratings OWNER TO sussybaka;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: member; Type: TABLE; Schema: public; Owner: sussybaka
--

CREATE TABLE public.member (
    id integer NOT NULL,
    username character varying(60) NOT NULL,
    score integer DEFAULT 0 NOT NULL,
    pwhash character(97) NOT NULL
);


ALTER TABLE public.member OWNER TO sussybaka;

--
-- Name: member_id_seq; Type: SEQUENCE; Schema: public; Owner: sussybaka
--

CREATE SEQUENCE public.member_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.member_id_seq OWNER TO sussybaka;

--
-- Name: member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sussybaka
--

ALTER SEQUENCE public.member_id_seq OWNED BY public.member.id;


--
-- Name: post; Type: TABLE; Schema: public; Owner: sussybaka
--

CREATE TABLE public.post (
    id integer NOT NULL,
    title character varying(60) NOT NULL,
    link character varying(100) NOT NULL,
    description character varying(250),
    created timestamp without time zone DEFAULT now() NOT NULL,
    mrating integer DEFAULT 0 NOT NULL,
    lower integer DEFAULT 0 NOT NULL,
    upper integer DEFAULT 0 NOT NULL,
    hidden boolean DEFAULT false NOT NULL,
    member_id integer NOT NULL
);


ALTER TABLE public.post OWNER TO sussybaka;

--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: sussybaka
--

CREATE SEQUENCE public.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_id_seq OWNER TO sussybaka;

--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sussybaka
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;


--
-- Name: rating; Type: TABLE; Schema: public; Owner: sussybaka
--

CREATE TABLE public.rating (
    rating public.ratings NOT NULL,
    member_id integer NOT NULL,
    post_id integer NOT NULL
);


ALTER TABLE public.rating OWNER TO sussybaka;

--
-- Name: member id; Type: DEFAULT; Schema: public; Owner: sussybaka
--

ALTER TABLE ONLY public.member ALTER COLUMN id SET DEFAULT nextval('public.member_id_seq'::regclass);


--
-- Name: post id; Type: DEFAULT; Schema: public; Owner: sussybaka
--

ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- Data for Name: member; Type: TABLE DATA; Schema: public; Owner: sussybaka
--

COPY public.member (id, username, score, pwhash) FROM stdin;
1	gelato_lover1	0	$argon2id$v=19$m=65536,t=2,p=1$JIQJvaLscTsRN734rvWvLQ$ez5o6SUBcFl7uu3IHDsvZ3a37vpdGe5cLgncNR8YKoI
2	icy_delights82 	0	$argon2id$v=19$m=65536,t=2,p=1$9K/3jRhLBS6i1EGTvcMIOQ$+c8ldOakMxaZ0/d67mBwkZoYuVVIOHqMsHuIWMmBkvA
3	frosty_treats19	0	$argon2id$v=19$m=65536,t=2,p=1$VcVhQgUquz0ZnYe0f29uJw$fnuHicfXXjWdPN7hqeNNNmiRRkFx7eRz5Mg/+yVBT9U
4	creamy_dreams7	0	$argon2id$v=19$m=65536,t=2,p=1$ovBcEo0h9hgMJ8IAXFOgLQ$HqH7OKL6p8Ac9WqwUEpFXEdHdyrznosb8/fnDzzQznk
12	ravi	0	$argon2id$v=19$m=65536,t=2,p=1$42KDeCQ1O93HR+nw/XaREg$MQQ16mKzcbjg+tOPtffdyad/0wkedopIoL1KkSyXiTU
49	test1	0	$argon2id$v=19$m=65536,t=2,p=1$Z3AXqYfTy5kxDJPLJrxdwQ$lf3wJilKOv18Bjjp+894EECSMsqM5/4FOOd9uUMl9Gc
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: sussybaka
--

COPY public.post (id, title, link, description, created, mrating, lower, upper, hidden, member_id) FROM stdin;
1	Gelato Messina Fitzroy	https://goo.gl/maps/5rdjYnaXsQs8FQFDA	Celebrated gelato shop with trendy decor serving more than 40 creative flavours, plus thickshakes.	2023-05-29 19:08:25.440815	0	0	0	f	12
2	Piccolina Gelateria	https://goo.gl/maps/XjU63ccv2ZpbvrEX7	43 Hardware Ln, Melbourne VIC 3000	2023-05-29 19:16:53.762578	0	0	0	f	12
3	C9 Chocolate and Gelato Fitzroy	https://goo.gl/maps/CWh1jJxhYVh7peDY7	377 Brunswick St, Fitzroy VIC 3065	2023-05-29 19:17:40.407547	0	0	0	f	12
4	C9 Chocolate and Gelato Fitzroy	https://goo.gl/maps/CWh1jJxhYVh7peDY7	377 Brunswick St, Fitzroy VIC 3065	2023-05-29 19:19:18.350281	0	0	0	f	12
5	New Zealand Natural	https://goo.gl/maps/8u8FzFoAHfHCHW7U6	Relaxed ice cream chain also doling out frozen yoghurts, low-fat smoothies & made-to-order juices.	2023-05-29 19:21:58.189649	0	0	0	f	12
\.


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: sussybaka
--

COPY public.rating (rating, member_id, post_id) FROM stdin;
\.


--
-- Name: member_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sussybaka
--

SELECT pg_catalog.setval('public.member_id_seq', 49, true);


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sussybaka
--

SELECT pg_catalog.setval('public.post_id_seq', 14, true);


--
-- Name: member member_pkey; Type: CONSTRAINT; Schema: public; Owner: sussybaka
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_pkey PRIMARY KEY (id);


--
-- Name: member member_username_key; Type: CONSTRAINT; Schema: public; Owner: sussybaka
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_username_key UNIQUE (username);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: sussybaka
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: post post_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sussybaka
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.member(id);


--
-- Name: rating rating_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sussybaka
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.member(id);


--
-- Name: rating rating_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sussybaka
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.post(id);


--
-- Name: TABLE member; Type: ACL; Schema: public; Owner: sussybaka
--

GRANT ALL ON TABLE public.member TO server;


--
-- Name: SEQUENCE member_id_seq; Type: ACL; Schema: public; Owner: sussybaka
--

GRANT USAGE ON SEQUENCE public.member_id_seq TO server;


--
-- Name: TABLE post; Type: ACL; Schema: public; Owner: sussybaka
--

GRANT ALL ON TABLE public.post TO server;


--
-- Name: SEQUENCE post_id_seq; Type: ACL; Schema: public; Owner: sussybaka
--

GRANT USAGE ON SEQUENCE public.post_id_seq TO server;


--
-- Name: TABLE rating; Type: ACL; Schema: public; Owner: sussybaka
--

GRANT ALL ON TABLE public.rating TO server;


--
-- PostgreSQL database dump complete
--

