import pydbus
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(14,GPIO.OUT)
import subprocess as sp
bus = pydbus.SystemBus()
adapter = bus.get('org.bluez', '/org/bluez/hci0')
mngr = bus.get('org.bluez', '/')
print ("Skanuje...")
time.sleep(1)
GPIO.output(14,GPIO.LOW)
def list_connected_devices():
    mngd_objs = mngr.GetManagedObjects()
    for path in mngd_objs:
        con_state = mngd_objs[path].get('org.bluez.Device1', {}).get('Connected', False)
        pair_state = mngd_objs[path].get('org.bluez.Device1', {}).get('Paired', False)
        if con_state and pair_state:
            addr = mngd_objs[path].get('org.bluez.Device1', {}).get('Address')
            name = mngd_objs[path].get('org.bluez.Device1', {}).get('Name')
            print(f'Urzadzenie {name} o adresie [{addr}] jest podlaczone')
            if mngd_objs[path].get('org.bluez.Device1', {}).get('Address') =="2C:D0:66:91:CD:C8" or \
               mngd_objs[path].get('org.bluez.Device1', {}).get('Address') =="A8:5B:B7:D3:CA:EC" or \
               mngd_objs[path].get('org.bluez.Device1', {}).get('Address') =="XX:XX:XX:XX:XX:XX" or \
               mngd_objs[path].get('org.bluez.Device1', {}).get('Address') =="XX:XX:XX:XX:XX:XX" or \
               mngd_objs[path].get('org.bluez.Device1', {}).get('Address') =="XX:XX:XX:XX:XX:XX" or \
               mngd_objs[path].get('org.bluez.Device1', {}).get('Address') =="XX:XX:XX:XX:XX:XX" or \
	           mngd_objs[path].get('org.bluez.Device1', {}).get('Address') =="XX:XX:XX:XX:XX:XX":           
             print ("Autoryzacja powiodla sie!")
             GPIO.output(14,GPIO.HIGH)
             
            else:   
              print ("LED off")
              GPIO.setup(14,GPIO.LOW)         
if __name__ == '__main__':
    list_connected_devices() 


