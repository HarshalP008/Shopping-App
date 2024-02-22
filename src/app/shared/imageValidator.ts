import { FormControl } from "@angular/forms";

export function requiredFileType( type: string ) {
    return function (control: FormControl) {
      const url = control.value;
        if ( url && url.has(".")) {
            const extension = url.split('.')[1].toLowerCase();
            if ( type.toLowerCase() !== extension.toLowerCase() ) {
                return {
                requiredFileType: true
                };
            }
            return null;
        }
        return null;
    };
  }