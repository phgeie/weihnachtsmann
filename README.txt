Benötigt:
	- git bash
	- maven
	- nodejs

Ausführung: 
	- Führen Sie das Build-Skript xmaswishes.sh mit git bash aus
	- Öffnen Sie ein Browser-Fenster mit http://localhost:4200/start
	- Nutzen sie die drei Seiten Wunsch erstellen, Wunsch finden und Admin

	- Für Apache Camel: Datei im Json-Format der Form: {"name":"testname", "wish":"testwish"} in das Verzeichnis wunschzettel im Spring-Boot-Server legen.

Zusatz:
	- Die nginx.conf macht nichts. Sie dient nur als Beispiel wie ein Teil des Load Balancing ausgeführt werden könnte.