
//% color=#009ede icon="\uf2db"
//% groups='["Servo","RGB LED","Port"]'
namespace Turtle {
    export enum Servo {
        //% block="S1"
        S1 = 8,        
        //% block="S2"
        S2 = 9,        
        //% block="S3"
        S3 = 10,
        //% block="S4"
        S4 = 11  
    }

    export enum LED {
        //% block="LED1"
        LED1,
        //% block="LED2"
        LED2,
    }

    /**
     * set servo angle
     * @param degree 0~180 degree of servo; eg: 0, 30, 109
    */
    //% blockId=Octopus_set_servo_angle block="set servo |%servoId| angle(0~180) |%degree| degree"
    //% weight=130
    //% degree.min=0 degree.max=180
    //% degree.shadow="protractorPicker"
    //% group="Servo"
    export function SetServoAngle(servoId: Turtle.Servo, degree: number = 0): void {
        let pin: AnalogPin;
        switch (servoId) {
            case Servo.S1: pin = AnalogPin.P0; break;
            case Servo.S2: pin = AnalogPin.P1; break;
            case Servo.S3: pin = AnalogPin.P2; break;
            case Servo.S4: pin = AnalogPin.P3; break;
        }            

        pins.servoWritePin(pin, degree);
    }

    let neoStrip: neopixel.Strip = neopixel.create(DigitalPin.P16, 2, NeoPixelMode.RGB);
    neoStrip.setBrightness(75);

    /**
     * set led color to a predefined color. 
    */
    //% blockId="Octopus_set_led_color" block="set |%led| color |%color|"
    //% weight=90
    //% group="RGB LED"
    export function setLedColor(led: LED, color: Easybit.Colors): void {
        neoStrip.setPixelColor(led, color);
        neoStrip.show();
    }

    /**
     * set all leds color to a predefined color. 
    */
    //% blockId="Octopus_set_all_leds_color" block="set all led colors |%color|"
    //% weight=80
    //% group="RGB LED"
    export function setAllLedColor(color: Easybit.Colors): void {
        neoStrip.setPixelColor(LED.LED1, color);
        neoStrip.setPixelColor(LED.LED2, color);
        neoStrip.show();
    }

    /**
     * set led color to a given rgb value. 
    */
    //% blockId="Octopus_set_led_rgb" block="set |%led| color red |%red| green |%green| blue |%blue|"
    //% weight=70
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    //% group="RGB LED"
    export function setLedRGB(led: LED, red: number, green: number, blue: number): void {
        neoStrip.setPixelColor(led, packRGB(red, green, blue));
        neoStrip.show();
    }

    /**
     * set all leds color to a given rgb value. 
    */
    //% blockId="Octopus_set_all_leds_rgb" block="set all leds color red |%red| green |%green| blue |%blue|"
    //% weight=60
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    //% group="RGB LED"
    export function setAllLedRGB(red: number, green: number, blue: number): void {
        let rgb = packRGB(red, green, blue);
        neoStrip.setPixelColor(LED.LED1, rgb);
        neoStrip.setPixelColor(LED.LED2, rgb);
        neoStrip.show();
    }

    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }

    /**
     * turn off all LEDs. 
    */
    //% blockId="Octopus_clear_all_leds" block="clear all leds"
    //% weight=50
    //% group="RGB LED"
    export function clearAllLeds(): void {
        neoStrip.clear();
        neoStrip.show();
    }

    /**
     * set brightness. 
     * @param level brightness level 0-100
    */
    //% blockId="Octopus_set_led_brightness" block="set led brightness(0~100)|%level|"
    //% weight=40
    //% level.min=0 level.max=100
    //% group="RGB LED"
    export function setLedsBrightness(level : number): void {
        neoStrip.setBrightness(pins.map(level, 0, 100, 0, 255));
        neoStrip.show();
    }

    /**
     * turn on/off microbit led screen to enable/disable some pins. 
     * @param enable true to enable screen, false to disable
    */
    //% blockId=Octopus_enable_led_screen block="enable led screen|%enable|"
    //% weight=140
    //% group="Port"
    export function enableLedScreen(enable : boolean): void {
        led.enable(enable);
   }

}
