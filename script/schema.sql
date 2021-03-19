CREATE TABLE DELIVERY_PROVIDER (
    provider_id SERIAL PRIMARY KEY,
    provider_name VARCHAR(255) NOT NULL
);

CREATE TABLE PARCEL (
    parcel_id SERIAL PRIMARY KEY,
    parcel_height DECIMAL NOT NULL,
    parcel_width DECIMAL NOT NULL,
    parcel_weight DECIMAL NOT NULL
);

CREATE TABLE SHIPMENT (
    shipment_id SERIAL PRIMARY KEY,
    parcel_id INTEGER NOT NULL REFERENCES PARCEL(parcel_id),
    to_address VARCHAR(255) NOT NULL,
    from_address VARCHAR(255) NOT NULL,
    shipment_status VARCHAR(255) NOT NULL
);

CREATE TABLE RATES (
    rate_id SERIAL PRIMARY KEY,
    shipment_id INTEGER NOT NULL REFERENCES SHIPMENT(shipment_id),
    provider_id INTEGER NOT NULL REFERENCES DELIVERY_PROVIDER(provider_id),
    rate DECIMAL NOT NULL
);

CREATE TABLE TRANSACTION (
    transaction_id SERIAL PRIMARY KEY,
    rate_id INTEGER NOT NULL REFERENCES RATES(rate_id)
);