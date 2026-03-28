import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politica de Privacidade | Corazon',
  description: 'Politica de privacidade e protecao de dados — LGPD.',
}

export default function PrivacidadePage() {
  return (
    <main className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-switzer text-4xl font-bold tracking-tight mb-4">Politica de Privacidade</h1>
        <p className="text-dark/40 text-sm mb-12">Ultima atualizacao: 28 de marco de 2026</p>

        <div className="space-y-10">

          <section>
            <h2 className="font-switzer text-xl font-semibold mb-3">1. Quem Somos</h2>
            <p className="text-dark/70 text-sm leading-relaxed">
              Corazon e um estudio de fotografia e videografia operado por Joyce. Este site (corazon.com) tem como objetivo apresentar nosso portfolio e facilitar o contato com potenciais clientes. Levamos a privacidade dos seus dados a serio e estamos comprometidos com a Lei Geral de Protecao de Dados (LGPD — Lei n 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="font-switzer text-xl font-semibold mb-3">2. Dados Coletados</h2>
            <p className="text-dark/70 text-sm leading-relaxed">
              Coletamos apenas os dados que voce fornece voluntariamente por meio do formulario de contato: nome, endereco de e-mail, assunto e mensagem. Nao coletamos dados sensiveis, dados de localizacao ou informacoes financeiras.
            </p>
          </section>

          <section>
            <h2 className="font-switzer text-xl font-semibold mb-3">3. Finalidade do Tratamento</h2>
            <p className="text-dark/70 text-sm leading-relaxed">
              Os dados coletados sao utilizados exclusivamente para responder as suas solicitacoes de contato e fornecer informacoes sobre nossos servicos de fotografia e videografia.
            </p>
          </section>

          <section>
            <h2 className="font-switzer text-xl font-semibold mb-3">4. Base Legal</h2>
            <p className="text-dark/70 text-sm leading-relaxed">
              O tratamento dos seus dados pessoais e realizado com base no seu consentimento (Art. 7, I da LGPD), fornecido ao preencher e enviar o formulario de contato, e no legitimo interesse (Art. 7, IX da LGPD) para responder as solicitacoes recebidas.
            </p>
          </section>

          <section>
            <h2 className="font-switzer text-xl font-semibold mb-3">5. Compartilhamento de Dados</h2>
            <p className="text-dark/70 text-sm leading-relaxed">
              Os dados enviados pelo formulario de contato sao processados pelo servico Formspree (formspree.io), que atua como operador para a entrega dos e-mails. Nao compartilhamos seus dados com terceiros para fins de marketing ou qualquer outra finalidade.
            </p>
          </section>

          <section>
            <h2 className="font-switzer text-xl font-semibold mb-3">6. Direitos do Titular</h2>
            <p className="text-dark/70 text-sm leading-relaxed mb-3">
              De acordo com a LGPD, voce tem os seguintes direitos em relacao aos seus dados pessoais:
            </p>
            <ul className="list-disc list-inside text-dark/70 text-sm leading-relaxed space-y-1">
              <li>Acesso aos dados pessoais que possuimos sobre voce</li>
              <li>Correcao de dados incompletos, inexatos ou desatualizados</li>
              <li>Exclusao dos dados pessoais tratados com base no seu consentimento</li>
              <li>Portabilidade dos dados a outro fornecedor de servico</li>
              <li>Revogacao do consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="font-switzer text-xl font-semibold mb-3">7. Cookies</h2>
            <p className="text-dark/70 text-sm leading-relaxed">
              Este site utiliza apenas cookies essenciais necessarios para o funcionamento basico do site. Nao utilizamos cookies de rastreamento, analytics ou publicidade.
            </p>
          </section>

          <section>
            <h2 className="font-switzer text-xl font-semibold mb-3">8. Retencao de Dados</h2>
            <p className="text-dark/70 text-sm leading-relaxed">
              Os dados enviados pelo formulario de contato sao retidos pelo tempo necessario para responder a sua solicitacao. Apos esse periodo, os dados sao excluidos, salvo obrigacao legal de retencao.
            </p>
          </section>

          <section>
            <h2 className="font-switzer text-xl font-semibold mb-3">9. Contato do Responsavel</h2>
            <p className="text-dark/70 text-sm leading-relaxed">
              Para exercer seus direitos ou esclarecer duvidas sobre esta politica, entre em contato conosco pelo e-mail: contato@corazon.com.
            </p>
          </section>

          <section>
            <h2 className="font-switzer text-xl font-semibold mb-3">10. Alteracoes nesta Politica</h2>
            <p className="text-dark/70 text-sm leading-relaxed">
              Reservamo-nos o direito de alterar esta politica de privacidade a qualquer momento. Quaisquer alteracoes serao publicadas nesta pagina com a data de atualizacao revisada.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
