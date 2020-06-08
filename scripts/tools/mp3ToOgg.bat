@echo off
setlocal

echo default: 160 kbps
set /p bitrate="bitrate(kbps)> "

if x%bitrate%==x echo bitrate = 160 & set bitrate=160

forfiles /m *.mp3 /c "cmd /c ffmpeg -i @fname.mp3 -vn -ac 2 -ar 44100 -ab %bitrate%k -acodec libvorbis -f ogg @fname.ogg"

endlocal