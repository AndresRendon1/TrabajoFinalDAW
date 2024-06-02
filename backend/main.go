package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/register", RegisterHandler).Methods("POST")
	r.HandleFunc("/login", LoginHandler).Methods("POST")
	r.HandleFunc("/reservations", CreateReservationHandler).Methods("POST")
	r.HandleFunc("/reservations", GetReservationsHandler).Methods("GET")
	r.HandleFunc("/reservations/{id}", DeleteReservationHandler).Methods("DELETE")
	r.HandleFunc("/report", ReportHandler).Methods("GET")

	log.Println("Server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
