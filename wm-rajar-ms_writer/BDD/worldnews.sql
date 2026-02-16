CREATE DATABASE worldnews;
CREATE SCHEMA writer;
CREATE SCHEMA reader;

-- Table pour les articles
CREATE TABLE writer.t_articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL UNIQUE,
    subtitle VARCHAR(300) NOT NULL,
    subhead VARCHAR(1000) NOT NULL,
    body TEXT NOT NULL,
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vue matérialisée pour les articles
CREATE MATERIALIZED VIEW reader.v_articles AS
    SELECT 
    id, 
    title, 
    subtitle, 
    subhead, 
    body, 
    publish_date
    FROM writer.t_articles;

-- Fonction pour rafraîchir la vue matérialisée après modification des articles
CREATE FUNCTION reader.refresh_v_articles()
RETURNS TRIGGER AS $$  
BEGIN
    REFRESH MATERIALIZED VIEW reader.v_articles;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour appeler la fonction de rafraîchissement après chaque modification
CREATE TRIGGER trg_refresh_v_articles
AFTER INSERT OR UPDATE OR DELETE ON writer.t_articles
FOR EACH STATEMENT
EXECUTE FUNCTION reader.refresh_v_articles();


