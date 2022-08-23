# GeoServer-Leaflet

# visualisation 

The objective of this project is to visualize data located on a geoserver and to visualize them with Leaflet.

# Requirements

- npm (version 8.15.0 used in our work)
- Geoserver (version 2.21 used in our work)
  - Windows tutorial  for Geoserver installation : https://www.youtube.com/watch?v=F7dDVD8WzKo
  - Linux tutorial for Geoserver installation : https://docs.geoserver.org/latest/en/user/installation/linux.html
  - MacOS tutorial for Geoserver installation : https://docs.geoserver.org/latest/en/user/installation/osx_installer.html
- Leaflet

# Build

- Run ```npm install``` in the working directory
- Start your Geoserver server
- Run the script and see result in the web  brower on ```localhost:63342```


# Dataset used
The data used for the visualization has been generated with BerlinMOD on MobilityDB(more information  about BerlinMOD here : https://github.com/MobilityDB/MobilityDB-BerlinMOD). If you  want to  display  a different data, you  need to  upload the data you  want to  visualize on Geoserver in the format of a GeoJson file, and then  request it in your script as done in our work using a ```WFS Request```.


# Example of visualization
https://user-images.githubusercontent.com/33086974/186127996-4b09699b-1ee6-4266-b1c7-28a3b8aa6df7.mp4

