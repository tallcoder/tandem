import { URIProtocol } from "./protocol";
import { Kernel, createSingletonProviderClass, IProvider } from "@tandem/common";

export class URIProtocolProvider implements IProvider {

  private _value: URIProtocol;
  readonly id: string;
  public owner: Kernel;
  readonly overridable: boolean = true;

  constructor(readonly name: string, readonly clazz: { new(): URIProtocol }) {
    this.id = URIProtocolProvider.getId(name);
  }

  static getId(name: string) {
    return ["protocols", name].join("/");
  }

  clone() {
    return new URIProtocolProvider(this.name, this.clazz);
  }

  get value() {
    return this._value || (this._value = this.owner.inject(new this.clazz())); 
  }

  static lookup(uri: string, kernel: Kernel) {

    // no protocol - it's a file
    if (uri.indexOf(":") === -1) {
      uri = "file://" + uri;
    }

    const protocol = uri.split(":")[0];

    const provider = kernel.query<URIProtocolProvider>(this.getId(protocol));
    return provider && provider.value;
  }
}



