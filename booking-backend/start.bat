REM @echo off

call mvn clean install

for /f "delims=[] tokens=2" %%a in ('ping -4 -n 1 %ComputerName% ^| findstr [') do set NetworkIP=%%a

docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d

echo "Stack started..."

echo "All Done!!!"