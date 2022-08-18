import React from "react";
import NavbarPagesHome from "../Navbar/Navbar";
import { Button, Card } from "react-bootstrap";

const HomePages = () => {
  return (
    <div>
      <NavbarPagesHome />
      <div className="container p-5">
        <Card>
          <Card.Header>Informasi Berita Terkini</Card.Header>
          <Card.Body>
            <Card.Title>banjir Pada Kecamatan Puloampel</Card.Title>
            <Card.Text>
              pada tanggal 20/11/2022 pada desa sumuranja telah terjadi banjir
              yang sangat dahsyat dan mengakibatkan orang orang yang terluka
            </Card.Text>
            <Button variant="primary">lanjut Membaca</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HomePages;
