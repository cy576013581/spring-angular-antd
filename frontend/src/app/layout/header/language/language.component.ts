import { Component, OnInit } from '@angular/core';

import { MenuService } from '../../../core/menu/menu.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { I18NService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  langs: any[];
  lang: any;

  constructor(
    private menuService: MenuService,
    public settings: SettingsService,
    public i18nService: I18NService
  ) {
    this.langs = this.i18nService.getLangs();
    this.lang = this.langs[0];
    this.langs.forEach(item => {
      if (item.code === this.i18nService.defaultLang) {
        this.lang = item;
      }
    });
  }


  ngOnInit() {
    this.i18nService.lang$.subscribe(
      (lang) => {
        this.langs.forEach(item => {
          if (item.code === lang) {
            this.lang = item;
          }
        });
      });
  }

  change(lang: any) {
    this.lang = lang;
    this.i18nService.use(lang.code, false).subscribe(() => {
      this.menuService.resume();
    });
    this.settings.setLayout('lang', lang.code);
  }

}
