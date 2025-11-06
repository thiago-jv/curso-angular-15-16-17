import { Component, Input } from '@angular/core';
import { User } from '../../app.component';

function setUserNameToUpperCase(user: User): User{
  return {
    ...user,
    name: user.name.toLocaleUpperCase()
  };
}


@Component({
  selector: 'app-input-transform',
  standalone: true,
  imports: [],
  template: `
  <h2>Nome: {{user?.name}}</h2>
  <h2>Idade: {{user?.age}}</h2>
  <h2>Profissão: {{user?.profession}}</h2>
  `,
})
export class InputTransformComponent {

  @Input({required: true, transform: setUserNameToUpperCase }) public user!: User

}
